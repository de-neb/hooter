import { createStore } from "vuex";
import date from "./modules/date";
import user from "./modules/user";

export const store = createStore({
  modules: {
    date,
    user,
  },
});
