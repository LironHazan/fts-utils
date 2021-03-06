import { Command } from '@oclif/command';
import { FLAGS } from '../tasks/start/consts';
import { Action, None } from '../fts.types';
import { optimizeSVG } from '../tasks/svg_opt/opt_svg';

export class SvgOpt extends Command {
  static description = 'Optimize SVG using svgomg';
  static flags = FLAGS;

  async run() {
    const { flags } = this.parse(SvgOpt);

    const action: Action = flags.action;

    if (!action) {
      const filepath = 'src/tasks/svg_opt/icon.svg';
      const result = await optimizeSVG(filepath);
      console.log((result as any)?.data ?? result);
    }
  }
}
