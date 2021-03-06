import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
import { FLAGS, QUESTIONS } from '../tasks/start/consts';
import { exportTask, importTask } from '../tasks/start/tasks';
import { Action, None } from '../fts.types';

export class MasterCmd extends Command {
  static description = 'Initiates an Import or an Export task.' + '("./bin/run start -n=<name>")';
  static flags = FLAGS;
  static args = [{ name: 'file' }];

  async init() {
    console.log('great hook!');
  }

  async run() {
    const { args, flags } = this.parse(MasterCmd);

    const name = flags.name ?? 'there';
    this.log(`hello ${name}!`);

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }

    const action: Action = flags.action;
    if (!action) {
      const responses: any = await inquirer.prompt(QUESTIONS);
      execTasks(responses.action);
    }
  }
}

function execTasks<T>(response: Action): T | None {
  switch (response) {
    case 'export':
      return exportTask();
    case 'import':
      return importTask();
    default:
      console.log('Nothing');
  }
}
