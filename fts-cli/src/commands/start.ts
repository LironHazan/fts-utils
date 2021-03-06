import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';
import { FLAGS, QUESTIONS } from '../tasks/start/consts';
import { exportTask, importTask, optimizeSVG } from '../tasks/start/tasks';
import { Action, None } from '../fts.types';

export class MasterCmd extends Command {
  static description = 'Initiates a Task.' + '("./bin/run start -n=<name>")';
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
      const filepath = 'src/tasks/start/icon.svg';
      const result = await execTasks(responses.action, filepath);
      console.log((result as any)?.data ?? result);
    }
  }
}

async function execTasks<T>(response: Action, filepath: string): Promise<{ data: string } | T | None> {
  switch (response) {
    case 'export':
      return exportTask();
    case 'import':
      return importTask();
    case 'opt_svg':
      return await optimizeSVG(filepath);
    default:
      console.log('Nothing');
  }
}
