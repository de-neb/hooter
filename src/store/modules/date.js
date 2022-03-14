export default {
  namespaced: true,
  state: {
    day: null,
    month: null,
    year: null,
    monthShortName: "",
  },

  mutations: {
    SET_DAY(state, payload) {
      state.day = payload;
    },
    SET_MONTH(state, payload) {
      state.month = payload;
    },
    SET_YEAR(state, payload) {
      state.year = payload;
    },
    SET_SHORT_MONTH(state, payload) {
      state.monthShortName = payload;
    },
  },
};
