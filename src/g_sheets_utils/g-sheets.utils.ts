// * Get and store new token after prompting for user authorization, and then
// * execute the given callback with the authorized OAuth2 client.
import { CbObj, OAuth2Client } from './fts-types';
import { promisify } from 'util';
const fs = require('fs');
const readline = require('readline');
const writeToFile = promisify(fs.writeFile);
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
export const TOKEN_PATH = 'src/private/token.json';

export function getNewToken(oAuth2Client: OAuth2Client, callback: CbObj) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code: any) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          'Error while trying to retrieve access token',
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      writeToFile(TOKEN_PATH, JSON.stringify(token)).then(() =>
        console.log('Token stored to', TOKEN_PATH)
      );
      callback(oAuth2Client);
    });
  });
}
