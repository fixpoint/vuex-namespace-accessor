import { Store } from 'vuex';
import { Accessor, ModuleAccessor, LazyModuleAccessor } from './accessor';

export { Accessor };

export function createAccessor<S = any, G = any, M = any, A = any>(
  store: Store<any> | (() => Store<any>),
  path: string | string[],
): Accessor<S, G, M, A> {
  path = Array.isArray(path) ? path.join('/') : path;
  if (typeof store === 'function') {
    return new LazyModuleAccessor(store, path);
  } else {
    return new ModuleAccessor(store, path);
  }
}
