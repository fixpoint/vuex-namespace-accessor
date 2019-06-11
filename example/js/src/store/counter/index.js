const state = {
  count: 0,
};

const getters = {
  half: state => state.count / 2,
};

const mutations = {
  inc(state, { amount }) {
    state.count += amount;
  },
};

const actions = {
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
