<template>
  <div class="container p-0">
    <slot name="home-header"> </slot>
    <slot name="common-top-nav"> </slot>
    <main class="flex-grow-1">
      <div class="filler"></div>
      <slot name="main"></slot>
      <slot name="status"></slot>
      <div class="filler"></div>
    </main>
    <ProfileOffCanvas v-if="isPageValid" />
    <aside class="compose" v-if="routeException">
      <router-link to="/compose" class="position-relative">
        <img src="../assets/feather.svg" />
      </router-link>
    </aside>
    <Footer v-if="isPageValid" />
  </div>
</template>

<script>
import Footer from "../components/home/Footer.vue";
import ProfileOffCanvas from "../components/home/ProfileOffCanvas.vue";
export default {
  components: { Footer, ProfileOffCanvas },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    isPageValid() {
      return this.routeName !== "PageNotFound";
    },
    isPageStatus() {
      return this.routeName === "Status";
    },
    routeException() {
      if (this.isPageValid && !this.isPageStatus) return true;
      return false;
    },
  },
};
</script>
