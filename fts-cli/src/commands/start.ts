import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';

type Action = 'import' | 'export' | string | undefined;
export class MasterCmd extends Command {
  static description = 'describe the command here';
  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
    action: flags.string({ options: ['import', 'export'] }),
  };
  static args = [{ name: 'file' }];

  async init() {}

  async run() {
    const { args, flags } = this.parse(MasterCmd);

    const name = flags.name ?? 'there';
    this.log(`hello ${name}!`);

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }

    let action: Action = flags.action;
    if (!action) {
      let responses: any = await inquirer.prompt([
        {
          name: 'action',
          message: 'What action to perform?',
          type: 'list',
          choices: [{ name: 'import' }, { name: 'export' }],
        },
      ]);
      action = responses.action;
    }
    switch (action) {
      case 'export':
        exportTask();
        break;
      case 'import':
        importTask();
        break;
      default:
        this.log('nothing');
    }

    this.log(`the action is: ${action}`);
  }
}

function importTask() {}
function exportTask() {}
