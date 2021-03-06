import { flags } from '@oclif/command';

export const QUESTIONS = [
  {
    name: 'action',
    message: 'What action to perform?',
    type: 'list',
    choices: [{ name: 'import' }, { name: 'export' }],
  },
  {
    name: 'cleanup',
    message: 'which cleanup method?',
    type: 'list',
    choices: [{ name: 'full' }, { name: 'partial' }],
  },
];

export const FLAGS = {
  help: flags.help({ char: 'h' }),
  // flag with a value (-n, --name=VALUE)
  name: flags.string({ char: 'n', description: 'name to print' }),
  // flag with no value (-f, --force)
  force: flags.boolean({ char: 'f' }),
  action: flags.string({ options: ['import', 'export'] }),
};
