import { createStore } from "vuex";
import date from "./modules/date";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    date,
    user,
  },
});
