<template>
  <div class="container p-0">
    <Header />
    <main class="flex-grow-1">
      <div class="filler"></div>
      <h1>some content...</h1>
      <slot name="main"></slot>
      <div class="filler"></div>
    </main>
    <ProfileOffCanvas />
    <aside class="compose">
      <router-link to="/compose" class="position-relative">
        <img src="../assets/feather.svg" />
      </router-link>
    </aside>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/home/Footer.vue";
import Header from "../components/home/Header.vue";
import ProfileOffCanvas from "../components/home/ProfileOffCanvas.vue";
export default {
  components: { Footer, Header, ProfileOffCanvas },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {},
};
</script>

<style>
</style>