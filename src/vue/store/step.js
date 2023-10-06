/**
 * state
 */
const state = {
  currentStep: 0,
  dogs: 0,
};

/**
 * getters
 */
const getters = {};

/**
 * mutations
 */
const mutations = {
  NEXT(state, payload) {
    state.currentStep = payload;
  },

  ADD_DOGS(state) {
    state.dogs = state.dogs + 1;
  },
};

/**
 * actions
 */
const actions = {
  next({ commit }, payload) {
    commit('NEXT', payload);
  },

  add_dogs({ commit }) {
    commit('ADD_DOGS');
  },
};

/**
 * export
 */
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
