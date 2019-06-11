import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter, { CounterState, CounterGetters } from './counter';
import { createAccessor } from '..';

const store = new Vuex.Store({
  modules: {
    counter,
  },
});

describe('createAccessor', () => {
  const a = createAccessor<CounterState, CounterGetters>(store, 'counter');

  it('returns an accessor which getters is linked to the module', () => {
    expect(a.state.count).toEqual(0);
    expect(a.getters.half).toEqual(0);

    store.commit('counter/inc', {
      amount: 20,
    });
    expect(a.state.count).toEqual(20);
    expect(a.getters.half).toEqual(10);

    store.commit('counter/inc', {
      amount: 10,
    });
    expect(a.state.count).toEqual(30);
    expect(a.getters.half).toEqual(15);
  });
});
