export type CbObj = { (auth: any): void; (arg0: any): void };

export interface Sheets {
  spreadsheets: {
    values: {
      get: (
        arg0: { spreadsheetId: any; range: any },
        arg1: (err: any, res: any) => void | Promise<unknown>
      ) => void;
    };
  };
}
export interface Creds {
  installed: { client_secret: any; client_id: any; redirect_uris: any };
}

export interface OAuth2Client {
  generateAuthUrl: (arg0: { access_type: string; scope: string[] }) => any;
  getToken: (arg0: any, arg1: (err: any, token: any) => void) => void;
  setCredentials: (arg0: any) => void;
}
