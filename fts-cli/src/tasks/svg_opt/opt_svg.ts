import { None } from '../../fts.types';
import { promisify } from 'util';
const svgo = require('svgo');
const fs = require('fs');
const readFromFile = promisify(fs.readFile);
import { taskEither } from 'fp-ts';
import { TaskEither } from 'fp-ts/TaskEither';

// Lazy
function readFileTask(filepath: string): TaskEither<Error, unknown> {
  return taskEither.tryCatch(
    () => readFromFile(filepath, 'utf8'),
    (reason) => new Error(String(reason)));
}

export function optimizeSVG<T>(filepath: string): Promise<{ data: string } | None> {
  console.log('svgo.optimize');
  return readFileTask(filepath)()
    .then((data: any) => svgo.optimize(data, { path: filepath }));
}
