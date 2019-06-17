import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter, { CounterState } from './counter';
import { createAccessor } from '..';

describe('createAccessor with store instance', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<CounterState>(store, 'counter');

  it('returns an accessor which state is linked to the module', () => {
    expect(a.state.count).toEqual(0);
    expect(a.state).toEqual(store.state.counter);

    store.commit('counter/inc', {
      amount: 20,
    });
    expect(a.state.count).toEqual(20);
    expect(a.state).toEqual(store.state.counter);

    store.commit('counter/inc', {
      amount: 10,
    });
    expect(a.state.count).toEqual(30);
    expect(a.state).toEqual(store.state.counter);
  });
});

describe('createAccessor with store factory', () => {
  const store = new Vuex.Store({
    modules: {
      counter,
    },
  });
  const a = createAccessor<CounterState>(() => store, 'counter');

  it('returns an accessor which state is linked to the module', () => {
    expect(a.state.count).toEqual(0);
    expect(a.state).toEqual(store.state.counter);

    store.commit('counter/inc', {
      amount: 20,
    });
    expect(a.state.count).toEqual(20);
    expect(a.state).toEqual(store.state.counter);

    store.commit('counter/inc', {
      amount: 10,
    });
    expect(a.state.count).toEqual(30);
    expect(a.state).toEqual(store.state.counter);
  });
});
