import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("user", ["name", "email", "username", "password"]),
    nameModel: {
      get() {
        return this.name;
      },
      set(value) {
        this.SET_NAME(value);
      },
    },
    emailModel: {
      get() {
        return this.email;
      },
      set(value) {
        this.SET_EMAIL(value);
      },
    },
    usernameModel: {
      get() {
        return this.username;
      },
      set(value) {
        this.SET_USERNAME(value);
      },
    },
    passwordModel: {
      get() {
        return this.password;
      },
      set(value) {
        this.SET_PASSWORD(value);
      },
    },
  },
  methods: {
    ...mapMutations("user", [
      "SET_NAME",
      "SET_PASSWORD",
      "SET_EMAIL",
      "SET_USERNAME",
    ]),
  },
};
