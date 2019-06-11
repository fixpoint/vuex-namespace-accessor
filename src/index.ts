import { Store } from 'vuex';
import { ModuleAccessor } from './accessor';

export { ModuleAccessor };

export function createAccessor<S = any, G = any, M = any, A = any>(
  store: Store<any>,
  path: string | string[],
): ModuleAccessor<S, G, M, A> {
  return new ModuleAccessor(store, Array.isArray(path) ? path.join('/') : path);
}
