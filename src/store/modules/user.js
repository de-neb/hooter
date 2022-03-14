import { createUser, getUser } from "@/services/RequestService";

export default {
  namespaced: true,
  state: {
    name: null,
    email: null,
    password: null,
    username: null,
    userObj: null,
  },
  mutations: {
    SET_NAME(state, payload) {
      state.name = payload;
    },
    SET_EMAIL(state, payload) {
      state.email = payload;
    },
    SET_PASSWORD(state, payload) {
      state.password = payload;
    },
    SET_USERNAME(state, payload) {
      state.username = payload;
    },
    SET_USER_FULL_INFO(state, payload) {
      state.userObj = payload;
    },
  },
  actions: {
    async signUp({ commit }, payload) {
      try {
        const user = await createUser(payload);
        commit("SET_NAME", user.first_name);
        commit("SET_USERNAME", user.username);
        return user;
      } catch (error) {
        console.log("dispatch error", error);
      }
    },
    async getUser({ commit }, payload) {
      try {
        const user = await getUser(payload);
        commit("SET_USERNAME", user.username);
        commit("SET_USER_FULL_INFO", user);
        return user;
      } catch (error) {
        console.log("error");
      }
    },
  },
};
