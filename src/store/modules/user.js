import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  userExists,
} from "@/services/RequestService";

export default {
  namespaced: true,
  state: {
    name: null,
    email: null,
    password: null,
    username: "",
    userObj: null,
    isAuthenticated: false,
  },
  getters: {},
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
    SET_IS_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
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
        return error;
      }
    },
    async logIn({ commit }, payload) {
      try {
        const response = await loginUser(payload);
        commit("SET_USERNAME", response.user.username);
        commit("SET_IS_AUTHENTICATED", true);
        commit("SET_USER_FULL_INFO", response.user);
        return response;
      } catch (error) {
        return error;
      }
    },
    async logOut({ commit }) {
      try {
        const res = await logoutUser();
        commit("SET_IS_AUTHENTICATED", false);
        return res;
      } catch (error) {
        console.log("dispatch error", error);
      }
    },
    async checkUser(_, payload) {
      try {
        const user = await userExists(payload);
        return user;
      } catch (error) {
        return error;
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
    checkCookieUid({ state }) {
      if (document.cookie.includes("uid")) {
        const uidCookie = decodeURIComponent(document.cookie)
          .substr(6)
          .replace(/"/g, "");
        return uidCookie === state.userObj._id;
      } else return false;
    },
  },
};
