import { createStore } from "vuex";

export const store = createStore({
  state: {
    isSignUpVisible: false,
    day: null,
    month: null,
    year: null,
    monthShortName: "",
    userDbUrl: process.env.VUE_APP_HOOT_JSON_DB,
  },
  mutations: {
    changeSignUpState(state) {
      state.isSignUpVisible = true;
    },
    updateDay(state, payload) {
      state.day = payload;
    },
    updateMonth(state, payload) {
      state.month = payload;
    },
    updateYear(state, payload) {
      state.year = payload;
    },
    setMonthShortName(state, payload) {
      state.monthShortName = payload;
    },
  },
  actions: {},
});
