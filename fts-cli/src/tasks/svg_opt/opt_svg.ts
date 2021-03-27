import { promisify } from 'util';
import { optimize, OptimizedSvg } from 'svgo';
import * as fs from 'fs';
const readFromFile = promisify(fs.readFile);

export function optimizeSVG<T>(filepath: string): Promise<OptimizedSvg> {
  console.log('svgo.optimize');
  return readFromFile(filepath, 'utf8').then((data: any) => {
    return optimize(data, { path: filepath });
  });
}
