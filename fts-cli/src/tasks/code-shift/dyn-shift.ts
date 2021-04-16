import { promisify } from 'util';
import { ChildProcess } from 'child_process';
import { taskEither } from 'fp-ts';
import { Either } from 'fp-ts/Either';
const exec = promisify(require('child_process').exec)

export function runCodeShift(): Promise<Either<Error, ChildProcess>> {
  return taskEither.tryCatch<Error, ChildProcess>(
    () => exec('npx jscodeshift -t ./src/tasks/code-shift/transform.ts --extensions=ts --parser=ts \'./src/tasks/code-shift/_test/target-file.ts\' --print'),
    (reason) => new Error(String(reason))
  )();
}
