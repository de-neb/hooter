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

      <PasswordInput />

      <a href="#" class="open-sans text-teak underline-hover text-start ps-2"
        >Forgot password?</a
      >
    </div>
    <div class="d-grid px-4 pt-2 pb-4" v-if="toNextStep">
      <button
        type="button"
        class="btn btn-dark rounded-pill my-3"
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
  <!-- <div class="valid-tooltip"></div>
    <div class="invalid-tooltip"></div> -->
</template>

<script>
import ModalForm from "../components/ModalForm.vue";
import PasswordInput from "../components/PasswordInput.vue";
export default {
  name: "Login",
  components: {
    PasswordInput,
    ModalForm,
  },
  data() {
    return {
      user: null,
      password: null,
      isLoading: true,
      toNextStep: false,
    };
  },
  methods: {
    closeLogin() {
      this.$router.push("/");
    },
    playSpinner(bool) {
      setTimeout(() => (this.isLoading = bool), 600);
    },
    loginNextStep() {
      //receive response from server

      //create function when user is empty or not found in db

      //when user exists in db
      this.toNextStep = true;
      console.log("bools", this.user, this.toNextStep);
    },
  },
  mounted() {
    this.playSpinner(false);
  },
};
</script>

<style>
</style>