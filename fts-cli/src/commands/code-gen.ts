import { Command, flags } from '@oclif/command';
import { testCodeGen } from '../tasks/code_gen/code-gen';

export class CodeGen extends Command {
  static description = 'Code gen';
  static flags = {
    name: flags.string({ char: 'n', description: 'class name' }),
  };
  async run() {
    const { args, flags } = this.parse(CodeGen);
    const name = flags?.name ?? 'DemoClass';
    testCodeGen(name);
  }
}
