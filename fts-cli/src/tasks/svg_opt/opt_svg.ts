import { None } from '../../fts.types';
import { promisify } from 'util';
const svgo = require('svgo');
const fs = require('fs');
const readFromFile = promisify(fs.readFile);

export function optimizeSVG<T>(filepath: string): Promise<{ data: string } | None> {
  console.log('svgo.optimize');
  return readFromFile(filepath, 'utf8').then((data: any) => {
    return svgo.optimize(data, { path: filepath });
  });
}
