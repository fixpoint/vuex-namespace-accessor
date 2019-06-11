import { Store } from 'vuex';
import {
  DefineGetters,
  DefineMutations,
  DefineActions,
  Dispatcher,
  Committer,
} from 'vuex-type-helper';

import {
  CounterState,
  CounterGetters,
  CounterMutations,
  CounterActions,
} from './types';

const state: CounterState = {
  count: 0,
};

const getters: DefineGetters<CounterGetters, CounterState> = {
  half: state => state.count / 2,
};

const mutations: DefineMutations<CounterMutations, CounterState> = {
  inc(state, { amount }) {
    state.count += amount;
  },
};

const actions: DefineActions<
  CounterActions,
  any,
  CounterMutations,
  CounterGetters
> = {
  incAsync({ commit }, payload) {
    setTimeout(() => {
      commit('inc', payload);
    }, payload.delay);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
