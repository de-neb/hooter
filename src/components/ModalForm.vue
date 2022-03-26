<template>
  <div class="low-opacity-backdrop">
    <div
      class="
        modal-container modal-fullscreen-md-down
        border-none
        d-flex
        justify-content-center
        align-items-center
      "
      v-if="isLoading"
    >
      <Spinner />
    </div>

    <div
      class="modal-container modal-fullscreen-md-down border-none"
      :class="{ 'pb-0': noPadding }"
      v-else-if="!isLoading"
    >
      <div class="modal-top">
        <div class="flex-fill position-relative h-100">
          <button type="button" class="btn circle-x" @click="closeLogin">
            <span class="material-icons align-middle lh-1"> close </span>
          </button>
        </div>
        <Logo class="logo-sm-login" />
        <div class="flex-fill h-100"></div>
      </div>
      <!-- content here -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import Spinner from "../components/Spinner.vue";
export default {
  name: "ModalForm",
  components: {
    Logo,
    Spinner,
  },
  props: ["noPadding"],
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    closeLogin() {
      this.$router.push({ path: "/" });
    },
    playSpinner(bool) {
      setTimeout(() => (this.isLoading = bool), 600);
    },
  },
  mounted() {
    this.playSpinner(false);
  },
};
</script>
