import { None } from '../../fts.types';

export function importTask<T>(): T | None {
  console.log('import');
  return undefined;
}

export function exportTask<T>(): T | None {
  console.log('export');
  return undefined;
}
