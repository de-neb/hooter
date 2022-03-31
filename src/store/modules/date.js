export default {
  namespaced: true,
  state: {
    day: null,
    month: null,
    year: null,
    monthShortName: "",
  },
  getters: {
    getMonthName: () => (format) => {
      return Array.from(Array(12), (e, i) => {
        return new Date(25e8 * ++i).toLocaleString("en-US", { month: format });
      });
    },
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
