<template>
  <ModalForm>
    <!-- login first step -->
    <div class="modal-body-cstm" v-if="!toNextStep">
      <h5 class="text-start my-4 fw-bold">Sign in to Hooter</h5>

      <div class="container d-grid gap-3 p-0">
        <button
          type="button"
          class="btn btn-outline-secondary rounded-pill btn-max-width my-2"
        >
          Sign in as {Google Auth}
        </button>
        <div
          class="d-flex justify-content-center align-items-center btn-max-width"
        >
          <span class="horizontal"></span>
          <span class="mx-2">or</span>
          <span class="horizontal"></span>
        </div>
        <div class="form-floating">
          <input
            type="text"
            name="user"
            class="form-control"
            placeholder="Username or email"
            autofocus=""
            v-model="user"
          />
          <label for="user">Username or Email</label>
        </div>
        <button
          type="button"
          class="btn btn-dark rounded-pill btn-max-width my-2 hover-dark"
          @click="loginNextStep"
          :disabled="isDisabled"
        >
          Next
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary rounded-pill btn-max-width"
        >
          Forgot password?
        </button>
        <h5 class="sign-up-text mb-3 mt-4 text-secondary open-sans">
          Don't have an account?
          <router-link to="/" class="open-sans text-teak underline-hover"
            >Sign Up</router-link
          >
        </h5>
      </div>
    </div>
    <!-- login next step  -->
    <div
      class="modal-body-cstm m-0 flex-grow-1 d-flex flex-column gap-2"
      v-else-if="toNextStep"
    >
      <h3 class="text-start fw-bold my-4">Enter your password</h3>
      <div class="form-floating my-2">
        <input
          type="text"
          name="userCopy"
          class="form-control"
          placeholder="Username or email"
          autofocus=""
          v-model="user"
          disabled
        />
        <label for="userCopy">Username or Email</label>
      </div>

      <PasswordInput v-model="password" :at-min-length="passwordAtMinLength" />

      <a href="#" class="open-sans text-teak underline-hover text-start ps-2"
        >Forgot password?</a
      >
    </div>

    <div class="d-grid px-4 pt-2 pb-4" v-if="toNextStep">
      <button
        type="button"
        class="btn btn-dark rounded-pill my-3"
        @click="logInPost"
        :disabled="!password"
      >
        Log In
      </button>
      <h6 class="sign-up-text mb-3 mt-4 text-secondary open-sans text-start">
        Don't have an account?
        <router-link to="/" class="open-sans text-teak underline-hover"
          >Sign Up</router-link
        >
      </h6>
    </div>
  </ModalForm>

  <!-- Errors-->
  <BottomError :show-error="isError" :error-text="errorMessage"></BottomError>
</template>

<script>
import { mapActions } from "vuex";
import HandleResponse from "@/mixins/HandleResponse";
import ModalForm from "@/components/ModalForm.vue";
import PasswordInput from "@/components/PasswordInput.vue";
import BottomError from "@/components/BottomError.vue";
export default {
  name: "Login",
  mixins: [HandleResponse],
  components: {
    PasswordInput,
    ModalForm,
    BottomError,
  },
  data() {
    return {
      user: "",
      password: "",
      isLoading: true,
      toNextStep: false,
    };
  },
  methods: {
    ...mapActions("user", ["logIn", "checkUser"]),
    closeLogin() {
      this.$router.push("/");
    },
    playSpinner(bool) {
      setTimeout(() => (this.isLoading = bool), 600);
    },
    async loginNextStep() {
      try {
        const response = await this.checkUser({ user: this.user });
        this.handleSuccess(response, () => (this.toNextStep = true));
      } catch ({ error }) {
        console.log(error);
        this.handleError(error.username);
      }
    },
    async logInPost() {
      if (this.user && this.password) {
        try {
          const response = await this.logIn({
            userIdentifier: this.user,
            password: this.password,
          });
          this.handleSuccess(response, () =>
            this.$router.push({ path: "/home" })
          );
        } catch ({ error }) {
          this.handleError(error.password);
        }
      }
    },
  },
  computed: {
    isDisabled() {
      return this.user == "" && this.password == "";
    },
    passwordAtMinLength() {
      return this.password && this.password.length >= 6;
    },
  },
  mounted() {
    this.playSpinner(false);
  },
};
</script>
