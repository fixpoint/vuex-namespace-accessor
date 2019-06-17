import { Store } from 'vuex';

function isObject(v: any): boolean {
  return v != null && Object(v) === v;
}

function moduleState<S>(store: Store<any>, path: string): S {
  return path.split('/').reduce((a: any, v: string) => {
    return a[v];
  }, store.state);
}

function moduleGetters<G>(store: Store<any>, path: string): G {
  const prefix = path + '/';
  return Object.defineProperties(
    {},
    Object.assign(
      {},
      ...Object.keys(store.getters)
        .filter(k => k.startsWith(prefix))
        .map(k => {
          return {
            [k.substring(prefix.length)]: {
              get() {
                return store.getters[k];
              },
            },
          };
        }),
    ),
  );
}

function moduleCommit(store: Store<any>, path: string, t: any, p?: any): void {
  if (isObject(t)) {
    return store.commit({
      ...t,
      type: `${[path, t.type].join('/')}`,
    });
  } else {
    return store.commit({
      type: `${[path, t].join('/')}`,
      ...(p || {}),
    });
  }
}

function moduleDispatch(
  store: Store<any>,
  path: string,
  t: any,
  p?: any,
): Promise<any> | void {
  if (isObject(t)) {
    return store.dispatch({
      ...t,
      type: `${[path, t.type].join('/')}`,
    });
  } else {
    return store.dispatch({
      type: `${[path, t].join('/')}`,
      ...(p || {}),
    });
  }
}

export interface Accessor<S, G, M, A> {
  readonly state: S;
  readonly getters: G;

  commit<K extends keyof M>(type: K, payload: M[K]): void;
  commit<K extends keyof M>(payloadWithType: { type: K } & M[K]): void;

  dispatch<K extends keyof A>(type: K, payload: A[K]): Promise<any> | void;
  dispatch<K extends keyof A>(
    payloadWithType: { type: K } & A[K],
  ): Promise<any> | void;
}

export class ModuleAccessor<S, G, M, A> implements Accessor<S, G, M, A> {
  private readonly store: Store<any>;
  private readonly path: string;

  readonly state: S;
  readonly getters: G;

  constructor(store: Store<any>, path: string) {
    this.store = store;
    this.path = path;
    this.state = moduleState<S>(store, path);
    this.getters = moduleGetters<G>(store, path);
  }

  public commit(t: any, p?: any): void {
    return moduleCommit(this.store, this.path, t, p);
  }

  public dispatch(t: any, p?: any): Promise<any> | void {
    return moduleDispatch(this.store, this.path, t, p);
  }
}

export class LazyModuleAccessor<S, G, M, A> implements Accessor<S, G, M, A> {
  private readonly _storeFactory: () => Store<any>;
  private readonly path: string;
  private _store?: Store<any>;
  private _state?: S;
  private _getters?: G;

  constructor(storeFactory: () => Store<any>, path: string) {
    this._storeFactory = storeFactory;
    this.path = path;
  }

  private get store(): Store<any> {
    if (!this._store) {
      this._store = this._storeFactory();
    }
    return this._store;
  }

  public get state(): S {
    if (!this._state) {
      this._state = moduleState<S>(this.store, this.path);
    }
    return this._state;
  }

  public get getters(): G {
    if (!this._getters) {
      this._getters = moduleGetters<G>(this.store, this.path);
    }
    return this._getters;
  }

  public commit(t: any, p?: any): void {
    return moduleCommit(this.store, this.path, t, p);
  }

  public dispatch(t: any, p?: any): Promise<any> | void {
    return moduleDispatch(this.store, this.path, t, p);
  }
}
