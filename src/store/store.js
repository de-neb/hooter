import { createStore } from "vuex";
import date from "./date";
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
  modules: {
    user,
    date,
  },
});
