import { Command } from '@oclif/command';
import { runCodeShift } from '../tasks/code-shift/dyn-shift';

export class CodeShift extends Command {
  static description = 'exec jscodeshift';
  async run() {
    try {
      await runCodeShift();
    } catch (e) {
      console.log(e);
    }


  }
}
