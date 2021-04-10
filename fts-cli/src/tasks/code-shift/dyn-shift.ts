import { promisify } from 'util';
import { ChildProcess } from 'child_process';
const exec = promisify(require('child_process').exec)

export async function runCodeShift(): Promise<ChildProcess> {
  return exec('npx jscodeshift -t ./src/tasks/code-shift/transform.ts --extensions=ts --parser=ts \'./src/tasks/code-shift/_test/target-file.ts\' --print');
}
