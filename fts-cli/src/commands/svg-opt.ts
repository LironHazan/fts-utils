import { Command } from '@oclif/command';
import { optimizeSVG } from '../tasks/svg_opt/opt_svg';

export class SvgOpt extends Command {
  static description = 'Optimize SVG using svgomg';
  async run() {
    const filepath = 'src/tasks/svg_opt/icon.svg';
    const result = await optimizeSVG(filepath);
    console.log((result as any)?.data ?? result);
  }
}
