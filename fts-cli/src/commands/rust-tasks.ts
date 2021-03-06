import { Command } from '@oclif/command';
const { exec } = require('child_process');

export class RustTasks extends Command {
  static description = 'Compile rust from node';
  async run() {
    //todo: fix
    const listener = exec('cargo build /src/rust_plugins', () => {});
    listener.stdout.on('data', (data: any) => {
      console.log(data);
    });
  }
}
