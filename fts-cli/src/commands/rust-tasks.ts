import { Command } from '@oclif/command';
const { exec } = require('child_process');

export class RustTasks extends Command {
  static description = 'Compile rust from node';
  async run() {
    exec('cargo build /src/rust_plugins', () => {});
  }
}
