import { createStore } from "vuex";

const user = {
  namespace: true,
  state: {
    uid: null,
    firstName: null,
    lastName: null,
    username: null,
    avatar: null,
  },
  getters: {
    getHootById: (state) => (id) => {
      return state.user.hoots.find((hoot) => hoot.id === id);
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.uid = payload._id;
      state.firstName = payload.first_name;
      state.lastName = payload.last_name;
      state.username = payload.username;
      state.avatar = payload.avatar;
    },
  },
  actions: {},
};

export const store = createStore({
  state: {
    isSignUpVisible: false,
    day: null,
    month: null,
    year: null,
    monthShortName: "",
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
  modules: {
    user,
  },
});
