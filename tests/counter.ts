import {
  DefineGetters,
  DefineMutations,
  DefineActions,
} from 'vuex-type-helper';

export interface CounterState {
  count: number;
}

export interface CounterGetters {
  // getterName: returnType
  half: number;
}

export interface CounterMutations {
  // mutationName: mutationPayloadType
  inc: {
    amount: number;
  };
}

export interface CounterActions {
  // actionName: actionPayloadType
  incAsync: {
    amount: number;
    delay: number;
  };
}

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
    return new Promise(resolve => {
      setTimeout(() => {
        commit('inc', payload);
        resolve();
      }, payload.delay);
    });
  },
};

export default {
  namespaced: true,
  state() {
    return { ...state };
  },
  getters,
  mutations,
  actions,
};
