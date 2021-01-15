import { CbObj, Creds, Sheets } from './fts-types';
const fs = require('fs');
const { google } = require('googleapis');
import { pipe } from 'fp-ts/lib/function';
import { tryCatch, map } from 'fp-ts/lib/TaskEither';
import { promisify } from 'util';
import { getNewToken, TOKEN_PATH } from './g-sheets.utils';
import { Task } from 'fp-ts/Task';
const readFromFile = promisify(fs.readFile);
const writeToFile = promisify(fs.writeFile);

// Main
(async () => {
  const readCreds: Task<string> = async () => readFromFile('src/private/credentials.json', 'utf-8');
  const fail = <T>(reason: T) => new Error(`${reason}`);
  const _authorize = (creds: string) => authorize(JSON.parse(creds), fetchTables);
  const done = await pipe(tryCatch(readCreds, fail), map(_authorize))();
  console.log(done);
})();

async function authorize(credentials: Creds, callback: CbObj) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const getTokenPath: Task<string> = async () => readFromFile(TOKEN_PATH, 'utf-8');
  const setCreds = (token: string) => {
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  };
  const newUserStrategy = () => getNewToken(oAuth2Client, callback);

  // Check if we have previously stored a token.
  await pipe(tryCatch(getTokenPath, newUserStrategy), map(setCreds))();
}

// * Prints the names and majors of students in a sample spreadsheet:
// * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
async function fetchTables(auth: any) {
  const sheets = google.sheets({ version: 'v4', auth });
  const authorised: Task<string> = async () => readFromFile('src/private/table_meta.json', 'utf-8');
  const authErr = () => console.log('error reading private/table_meta.json');
  const fetchTables = (data: string) => {
    const { tables, id } = JSON.parse(data);
    const task = (t: string) => fetchTable(sheets, t, id);
    Promise.all(tables.map(task))
      .then(() => console.log('done'))
      .catch((err) => console.log(err))
      .finally(() => console.log('bye bye'));
  };
  await pipe(tryCatch(authorised, authErr), map(fetchTables))();
}

function fetchTable<T>(sheets: Sheets, range: any, spreadsheetId: any): Promise<T> {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({ spreadsheetId, range }, (err, res) => {
      if (err || !res.data) {
        console.log('The API returned an error: ' + err);
        return reject();
      }
      return tableAsJson(res.data.values, range);
    });
  });
}

function tableAsJson(rows: any, tableName: any): Promise<any> {
  const model = transformToTestSuiteModel(rows);
  return writeToFile(`tables/${tableName}.json`, JSON.stringify(model));
}

// before: [suite_name, test_name, objective, null, steps, expected]
// helper struct: { suitename: [tests ..] }
// final struct: [{name, tests: [{name, objective, steps}]}]
function transformToTestSuiteModel(rows: any) {
  // prepare suites - to map
  const suites = getSuites(rows);
  return Object.keys(suites).map((key) => ({
    name: key,
    tests: (suites as any)[key],
  }));
}

function getSuites(rows: any) {
  const suites = {};
  for (const row of rows) {
    const name = row[0].replace(' ', '');
    const testName = row[1].replace(' ', '_');
    if (!(suites as any)[name]) {
      (suites as any)[name] = [];
    }
    (suites as any)[name].push({
      name: testName,
      objective: row[2] || '',
      steps: row[4] || '',
      expected: row[5] || '',
    });
  }
  return suites;
}
