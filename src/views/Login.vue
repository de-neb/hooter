<template>
  <div class="login-backdrop">
    <div class="modal-container modal-fullscreen-md-down border-none">
      <div class="modal-top">
        <div class="flex-fill position-relative">
          <button type="button" class="btn circle-x">
            <span class="material-icons align-middle"> close </span>
          </button>
        </div>
        <Logo class="logo-sm-login" />
        <div class="flex-fill"></div>
      </div>
      <div class="modal-body-cstm">
        <h5 class="text-start my-4 fw-bold">Sign in to Hooter</h5>

        <div class="container d-grid gap-3 p-0">
          <button
            type="button"
            class="btn btn-outline-secondary rounded-pill btn-max-width my-2"
          >
            Sign in as {Google Auth}
          </button>
          <div
            class="
              d-flex
              justify-content-center
              align-items-center
              btn-max-width
            "
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
            />
            <label for="user">Username or Email</label>
          </div>
          <button
            type="button"
            class="btn btn-dark rounded-pill btn-max-width my-2"
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
            <router-link to="/" class="open-sans text-info underline-hover"
              >Sign Up</router-link
            >
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
export default {
  name: "Login",
  components: {
    Logo,
  },
};
</script>

<style>
</style>