import Keyv = require('keyv');

type None = undefined | null;

export class Store {
  private cache: Keyv | None = null;

  constructor() {
    this.cache = new Keyv();
  }

  static instance(): Store {
    return new Store();
  }

  set<T>(key: string, value: T, ttl?: number): Promise<true> | None {
    return this.cache?.set(key, value, ttl);
  }

  get<T>(key: string): Promise<T | None> | None {
    return this.cache?.get(key);
  }

  delete(key: string): Promise<boolean> | None {
    return this.cache?.delete(key);
  }

  clear(): Promise<void> | None {
    return this.cache?.clear();
  }
}
