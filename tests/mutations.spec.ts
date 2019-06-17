import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter, {
  CounterState,
  CounterGetters,
  CounterMutations,
} from './counter';
import { createAccessor } from '..';

describe('createAccessor with store instance', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<CounterState, CounterGetters, CounterMutations>(
    store,
    'counter',
  );

  it('returns an accessor which commit is linked to the module', () => {
    expect(store.state.counter.count).toEqual(0);

    a.commit('inc', {
      amount: 20,
    });
    expect(store.state.counter.count).toEqual(20);

    a.commit('inc', {
      amount: 10,
    });
    expect(store.state.counter.count).toEqual(30);
  });
});

describe('createAccessor with store factory', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<CounterState, CounterGetters, CounterMutations>(
    () => store,
    'counter',
  );

  it('returns an accessor which commit is linked to the module', () => {
    expect(store.state.counter.count).toEqual(0);

    a.commit('inc', {
      amount: 20,
    });
    expect(store.state.counter.count).toEqual(20);

    a.commit('inc', {
      amount: 10,
    });
    expect(store.state.counter.count).toEqual(30);
  });
});
