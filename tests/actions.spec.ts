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

const store = new Vuex.Store({
  modules: {
    counter,
  },
});

describe('createAccessor', () => {
  const a = createAccessor<
    CounterState,
    CounterGetters,
    CounterMutations,
    CounterActions
  >(store, 'counter');

  it('returns an accessor which dispatch is linked to the module', async () => {
    let p: Promise<any> | void;

    expect(a.state.count).toEqual(0);
    expect(a.getters.half).toEqual(0);

    p = a.dispatch('incAsync', {
      amount: 20,
      delay: 200,
    });
    expect(a.state.count).toEqual(0);
    expect(a.getters.half).toEqual(0);
    await p;
    expect(a.state.count).toEqual(20);
    expect(a.getters.half).toEqual(10);

    p = a.dispatch('incAsync', {
      amount: 10,
      delay: 200,
    });
    expect(a.state.count).toEqual(20);
    expect(a.getters.half).toEqual(10);
    await p;
    expect(a.state.count).toEqual(30);
    expect(a.getters.half).toEqual(15);
  });
});
