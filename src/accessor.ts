import { Store } from 'vuex';

function isObject(v: any): boolean {
  return v != null && Object(v) === v;
}

function getModuleState<S>(store: Store<any>, path: string): S {
  return path.split('/').reduce((a: any, v: string) => {
    return a[v];
  }, store.state);
}

function getModuleGetters<G>(store: Store<any>, path: string): G {
  return new Proxy(
    {},
    {
      get<K extends keyof G>(_: any, name: K): G[K] {
        return store.getters[`${[path, name].join('/')}`];
      },
    },
  );
}

export class ModuleAccessor<S, G, M, A> {
  readonly path: string;
  _store: Store<any> | (() => Store<any>);
  _state?: S;
  _getters?: G;

  constructor(store: Store<any>, path: string) {
    this._store = store;
    this.path = path;
  }

  private get store(): Store<any> {
    if (typeof this._store === 'function') {
      this._store = this._store();
    }
    return this._store;
  }

  public get state(): S {
    if (!this._state) {
      this._state = getModuleState<S>(this.store, this.path);
    }
    return this._state;
  }

  public get getters(): G {
    if (!this._getters) {
      this._getters = getModuleGetters<G>(this.store, this.path);
    }
    return this._getters;
  }

  public commit<K extends keyof M>(type: K, payload: M[K]): void;
  public commit<K extends keyof M>(payloadWithType: { type: K } & M[K]): void;
  public commit(t: any, p?: any): void {
    if (isObject(t)) {
      return this.store.commit({
        ...t,
        type: `${[this.path, t.type].join('/')}`,
      });
    } else {
      return this.store.commit({
        type: `${[this.path, t].join('/')}`,
        ...(p || {}),
      });
    }
  }

  public dispatch<K extends keyof A>(
    type: K,
    payload: A[K],
  ): Promise<any> | void;
  public dispatch<K extends keyof A>(
    payloadWithType: { type: K } & A[K],
  ): Promise<any> | void;
  public dispatch(t: any, p?: any): Promise<any> | void {
    if (isObject(t)) {
      return this.store.dispatch({
        ...t,
        type: `${[this.path, t.type].join('/')}`,
      });
    } else {
      return this.store.dispatch({
        type: `${[this.path, t].join('/')}`,
        ...(p || {}),
      });
    }
  }
}
