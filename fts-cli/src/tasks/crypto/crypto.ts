import { flags } from '@oclif/command';

const crypto = require('crypto');
const ENC_KEY = Buffer.from('bf3c199c2470cb477d907b1e0917c17bbf3c199c2470cb477d907b1e0917c17b', 'hex'); // set random encryption key
const IV = Buffer.from('5183666c72eec9e45183666c72eec9e4', 'hex');

export const FLAGS = {
  help: flags.help({ char: 'h' }),
  text: flags.string({ char: 't', description: 'text to encrypt' }),
  fn: flags.string({ options: ['encrypt', 'decrypt'] }),
};

export const CHOICES = [
  {
    name: 'fn',
    message: 'Encrypt/Decrypt',
    type: 'list',
    choices: [{ name: 'encrypt' }, { name: 'decrypt' }],
  },
];

export class AES {
  encrypt(text: string | undefined): string {
    let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(text);
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decrypt(encrypted: string | undefined): string {
    let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  }
}
