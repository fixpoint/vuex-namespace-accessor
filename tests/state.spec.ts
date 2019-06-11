import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter, { CounterState } from './counter';
import { createAccessor } from '..';

const store = new Vuex.Store({
  modules: {
    counter,
  },
});

describe('createAccessor', () => {
  const a = createAccessor<CounterState>(store, 'counter');

  it('returns an accessor which state is linked to the module', () => {
    expect(a.state.count).toEqual(0);
    expect(a.state).toMatchSnapshot();

    store.commit('counter/inc', {
      amount: 20,
    });
    expect(a.state.count).toEqual(20);
    expect(a.state).toMatchSnapshot();

    store.commit('counter/inc', {
      amount: 10,
    });
    expect(a.state.count).toEqual(30);
    expect(a.state).toMatchSnapshot();
  });
});
