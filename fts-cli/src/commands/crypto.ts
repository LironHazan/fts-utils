import { Command } from '@oclif/command';
import { AES, CHOICES, FLAGS } from '../tasks/crypto/crypto';
import * as inquirer from 'inquirer';
import { None } from '../fts.types';

export class Crypto extends Command {
  static description = 'node crypto';
  static flags = FLAGS;

  async run() {
    //todo: fix flow
    const { flags } = this.parse(Crypto);
    const text = flags?.text;
    const responses = await inquirer.prompt(CHOICES);
    const result = await execTasks(responses.fn, text);
    console.log(result);
  }
}

async function execTasks<T>(response: 'encrypt' | 'decrypt', input: string | undefined): Promise<string | None> {
  const crypto = new AES();
  switch (response) {
    case 'encrypt':
      return crypto.encrypt(input);
    case 'decrypt':
      return crypto.decrypt(input);
    default:
      console.log('Nothing');
  }
}
