import { Command } from '@oclif/command';
import { runCodeShift } from '../tasks/code-shift/dyn-shift';
import { pipe } from 'fp-ts/function';
import { either } from 'fp-ts';
import { Either } from 'fp-ts/Either';
import { ChildProcess } from 'child_process';

export class CodeShift extends Command {
  static description = 'exec jscodeshift';
  async run() {
    const result: Either<Error, ChildProcess> = await runCodeShift();
    const final = pipe(
      result,
      either.fold(
        (err) => console.log(err.message),
        (x) => {
          console.log(x)
          return 'done'
        }
      )
    )
    console.log(final);
  }
}
