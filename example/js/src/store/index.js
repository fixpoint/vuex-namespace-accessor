import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import counter from './counter';
import { createAccessor } from 'vuex-namespace-accessor';
export const $counter = createAccessor(() => store, 'counter');

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    counter,
  },
});
export default store;
