type None = undefined | null;

export class Store {
  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map<string, any>();
  }

  static instance(): Store {
    return new Store();
  }

  set<T>(key: string, value: T): Map<string, any> {
    return this.cache?.set(key, value);
  }

  get<T>(key: string): T {
    return this.cache?.get(key);
  }
}
