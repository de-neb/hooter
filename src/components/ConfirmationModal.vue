<template>
  <div class="modal-dialog modal-dialog-centered my-0 h-100 modal-width-small">
    <div class="modal-content rounded-4 p-4 align-items-center">
      <div
        class="modal-body row flex-column align-items-center gap-3 w-100 p-0"
      >
        <div class="col-3">
          <Logo />
        </div>
        <div class="col p-0 text-start">
          <h5 class="fw-bold">Log out of Hooter?</h5>
          <p class="text-secondary fs-7">
            You can always log back in at any time. If you just want to switch
            accounts, you can do that by adding an existing account.
          </p>
        </div>
      </div>
      <div class="w-100 p-0 d-grid gap-2 mt-4">
        <button
          type="button"
          class="btn btn-dark rounded-pill p-2 fw-bold"
          @click="logOutUser"
        >
          Log out
        </button>
        <button
          type="button"
          class="btn btn-light border rounded-pill p-2 fw-bold"
          @click="cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Logo from "@/components/Logo.vue";
export default {
  components: {
    Logo,
  },
  methods: {
    ...mapActions("user", ["logOut"]),
    ...mapMutations("user", ["SET_USERNAME"]),
    logOutUser() {
      this.logOut().then(() => {
        this.SET_USERNAME(null);
        window.sessionStorage.clear();
        this.$router.push({ path: "/" });
      });
    },
    cancel() {
      this.$router.push({ path: "/home" });
    },
  },
};
</script>
