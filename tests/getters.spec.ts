import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter, { CounterState, CounterGetters } from './counter';
import { createAccessor } from '..';

describe('createAccessor with store instance', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<CounterState, CounterGetters>(store, 'counter');

  it('returns an accessor which getters is linked to the module', () => {
    expect(a.getters.half).toEqual(0);
    expect(a.getters.half).toEqual(store.getters['counter/half']);

    store.commit('counter/inc', {
      amount: 20,
    });
    expect(a.getters.half).toEqual(10);
    expect(a.getters.half).toEqual(store.getters['counter/half']);

    store.commit('counter/inc', {
      amount: 10,
    });
    expect(a.getters.half).toEqual(15);
    expect(a.getters.half).toEqual(store.getters['counter/half']);
  });
});

describe('createAccessor with store factory', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<CounterState, CounterGetters>(
    () => store,
    'counter',
  );

  it('returns an accessor which getters is linked to the module', () => {
    expect(a.getters.half).toEqual(0);
    expect(a.getters.half).toEqual(store.getters['counter/half']);

    store.commit('counter/inc', {
      amount: 20,
    });
    expect(a.getters.half).toEqual(10);
    expect(a.getters.half).toEqual(store.getters['counter/half']);

    store.commit('counter/inc', {
      amount: 10,
    });
    expect(a.getters.half).toEqual(15);
    expect(a.getters.half).toEqual(store.getters['counter/half']);
  });
});
