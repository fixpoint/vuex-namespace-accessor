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

  it('returns an accessor which watch is linked to the module', async () => {
    const rs: string[] = [];
    const unwatch = a.watch(
      (state, getters) => {
        expect(state).toEqual(a.state);
        expect(getters).toEqual(a.getters);
        return getters.half;
      },
      () => {
        rs.push('called');
      },
    );
    await Vue.nextTick();
    expect(rs).toEqual([]);

    store.commit('counter/inc', {
      amount: 20,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called']);

    store.commit('counter/inc', {
      amount: 10,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called', 'called']);

    store.commit('counter/inc', {
      amount: 0,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called', 'called']);

    unwatch();
    store.commit('counter/inc', {
      amount: 10,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called', 'called']);
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

  it('returns an accessor which watch is linked to the module', async () => {
    const rs: string[] = [];
    const unwatch = a.watch(
      (state, getters) => {
        expect(state).toEqual(a.state);
        expect(getters).toEqual(a.getters);
        return getters.half;
      },
      () => {
        rs.push('called');
      },
    );
    await Vue.nextTick();
    expect(rs).toEqual([]);

    store.commit('counter/inc', {
      amount: 20,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called']);

    store.commit('counter/inc', {
      amount: 10,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called', 'called']);

    store.commit('counter/inc', {
      amount: 0,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called', 'called']);

    unwatch();
    store.commit('counter/inc', {
      amount: 10,
    });
    await Vue.nextTick();
    expect(rs).toEqual(['called', 'called']);
  });
});
