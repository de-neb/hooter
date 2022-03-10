<template>
  <div class="home-main-container">
    <div class="top-child">
      <div class="right-container p-3 mx-auto">
        <div class="container p-3 mx-auto">
          <div class="d-flex">
            <Logo class="logo-sm" />
          </div>
          <h1 class="greet my-5">
            <span>Happening now</span>
          </h1>
          <h3 class="sub-greet text-start fw-bold mb-3">Join Hooter today.</h3>

          <div class="container d-grid gap-2 p-0">
            <button
              type="button"
              class="btn btn-outline-secondary rounded-pill btn-max-width"
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
            <button
              type="button"
              class="btn btn-secondary rounded-pill btn-max-width"
              @click="showSignupForm"
            >
              Sign up with username or email
            </button>
            <div class="tos mb-3 btn-max-width">
              <span
                >By signing up, you agree to the Terms of Service and Privacy
                Policy, including Cookie Use.</span
              >
            </div>
            <div class="mt-4 d-grid mb-2 mt-4">
              <h5 class="fs-6 fw-bold text-start mb-3">
                Already have an account?
              </h5>
              <button
                type="button"
                class="
                  btn btn-outline-secondary
                  rounded-pill
                  btn-max-width
                  mb-2
                "
                @click="goToLogin"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-container">
        <div class="parallax"></div>
        <Logo class="logo-lg" />
      </div>
    </div>

    <div class="bottom-child">
      <footer class="footer p-3 text-center">
        <a
          href="/"
          class="footer-links link-secondary pe-2 m-1"
          v-for="(link, i) in footerLinks"
          :key="link + '-' + i"
          ><span class="link-text">{{ link }}</span></a
        >
        <span class="footer-links link-secondary pe-2 m-1"
          >©2022 Hooter, Inc.</span
        >
      </footer>
    </div>

    <!-- sign up view -->
    <router-view />
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
export default {
  components: {
    Logo,
  },
  data() {
    return {
      footerLinks: [
        "About",
        "Help Center",
        "Terms of Service",
        "Privacy Policy",
        "Cookie Policy",
        "Accessibility",
        "Ads info",
        "Blog",
        "Status",
        "Careers",
        "Brand Resources",
        "Advertising",
        "Marketing",
        "Twitter for Business",
        "Developers",
        "Directory",
        "Settings",
      ],
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    showSignupForm() {
      this.$router.push("/signup");
    },
  },
  computed: {},
};
</script>

<style>
</style>