import { createStore } from "vuex";

export const store = createStore({
  state: {
    isSignUpVisible: false,
  },
  mutations: {
    changeSignUpState(state) {
      state.isSignUpVisible = true;
    },
  },
});
