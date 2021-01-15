import express = require('express');
import { exportTables } from '../g_sheets_utils';
import { pipe } from 'fp-ts/function';
import { tryCatch } from 'fp-ts/Either';
import { Task } from 'fp-ts/Task';

const app: express.Application = express();

app.get('/export', async function (req, res) {
  const handleErr = (err: unknown) => {
    new Error(`exportTables failed: ${err}`);
    return res.send('Error');
  };
  const exportTask: Task<unknown> = async () => {
    await exportTables();
    return res.send('done');
  };
  pipe(tryCatch(exportTask, handleErr));
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
