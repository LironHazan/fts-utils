import { CbObj, Creds, Sheets } from './fts-types';
import { pipe } from 'fp-ts/lib/function';
import { tryCatch, map } from 'fp-ts/lib/TaskEither';
import { promisify } from 'util';
import { getNewToken, TOKEN_PATH } from './g-sheets.utils';
import { Task } from 'fp-ts/Task';
import { array, either, task } from 'fp-ts';
import { Either } from 'fp-ts/Either';

const fs = require('fs');
const { google } = require('googleapis');
const readFromFile = promisify(fs.readFile);
const writeToFile = promisify(fs.writeFile);

// Main
export async function exportTables<E>(): Promise<Either<Error, Promise<Either<void, void>>>> {
  const readCreds: Task<string> = async () => readFromFile('src/private/credentials.json', 'utf-8');
  const fail = <T>(reason: T) => new Error(`${reason}`);
  const _authorize = (creds: string) => authorize(JSON.parse(creds), fetchTables);
  return await pipe(tryCatch(readCreds, fail), map(_authorize))();
}

async function authorize(credentials: Creds, callback: CbObj): Promise<Either<void, void>> {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const getTokenPath: Task<string> = async () => readFromFile(TOKEN_PATH, 'utf-8');
  const setCreds = (token: string) => {
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  };
  const newUserStrategy = () => getNewToken(oAuth2Client, callback);

  // Check if we have previously stored a token.
  return await pipe(tryCatch(getTokenPath, newUserStrategy), map(setCreds))();
}

// * Prints the names and majors of students in a sample spreadsheet:
// * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
async function fetchTables(auth: any): Promise<Either<void, void>> {
  const sheets = google.sheets({ version: 'v4', auth });
  const authorised: Task<string> = async () => readFromFile('src/private/table_meta.json', 'utf-8');
  const authErr = () => console.log('error reading private/table_meta.json');
  const fetchTables = (data: string) => {
    const { tables, id } = JSON.parse(data);

    const ft: (t: string) => Task<unknown> = (t: string) => task.of(fetchTable(sheets, t, id));
    const tasks = tables.map(ft);

    const parallel = array.sequence(task.task)(tasks)();
    parallel.then((_: any) =>
      pipe(
        _,
        either.fold(
          (err) => console.log(err),
          () => console.log('done!')
        )
      )
    );
  };
  return await pipe(tryCatch(authorised, authErr), map(fetchTables))();
}

function fetchTable<T>(sheets: Sheets, range: any, spreadsheetId: any): Promise<T> {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({ spreadsheetId, range }, (err, res) => {
      if (err || !res.data) {
        console.log('The API returned an error: ' + err);
        return reject(err);
      }
      return resolve(tableAsJson(res.data.values, range));
    });
  });
}

function tableAsJson(rows: any, tableName: any): Promise<any> {
  return writeToFile(`tables/${tableName}.json`, JSON.stringify(rows));
}
