import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter, {
  CounterState,
  CounterGetters,
  CounterMutations,
  CounterActions,
} from './counter';
import { createAccessor } from '..';

describe('createAccessor with store instance', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<
    CounterState,
    CounterGetters,
    CounterMutations,
    CounterActions
  >(store, 'counter');

  it('returns an accessor which dispatch is linked to the module', async () => {
    let p: Promise<any> | void;
    expect(store.state.counter.count).toEqual(0);

    p = a.dispatch('incAsync', {
      amount: 20,
      delay: 200,
    });
    expect(store.state.counter.count).toEqual(0);
    await p;
    expect(store.state.counter.count).toEqual(20);

    p = a.dispatch('incAsync', {
      amount: 10,
      delay: 200,
    });
    expect(store.state.counter.count).toEqual(20);
    await p;
    expect(store.state.counter.count).toEqual(30);
  });
});

describe('createAccessor with store factory', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<
    CounterState,
    CounterGetters,
    CounterMutations,
    CounterActions
  >(() => store, 'counter');

  it('returns an accessor which dispatch is linked to the module', async () => {
    let p: Promise<any> | void;
    expect(store.state.counter.count).toEqual(0);

    p = a.dispatch('incAsync', {
      amount: 20,
      delay: 200,
    });
    expect(store.state.counter.count).toEqual(0);
    await p;
    expect(store.state.counter.count).toEqual(20);

    p = a.dispatch('incAsync', {
      amount: 10,
      delay: 200,
    });
    expect(store.state.counter.count).toEqual(20);
    await p;
    expect(store.state.counter.count).toEqual(30);
  });
});
