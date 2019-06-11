import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

import counter from './counter';

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    counter,
  },
});
export default store;

import {
  CounterState,
  CounterGetters,
  CounterMutations,
  CounterActions,
} from './counter/types';
import { createAccessor } from 'vuex-namespace-accessor';

export const $counter = createAccessor<
  CounterState,
  CounterGetters,
  CounterMutations,
  CounterActions
>(store, 'counter');
