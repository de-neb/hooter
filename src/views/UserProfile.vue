<template>
  <div class="position-relative">
    <TopNav>
      <template #middle-content>
        <h6 class="fw-bold m-0">User Name</h6>
        <span class="text-start text-secondary sub-text">0 Hoots</span>
      </template>
    </TopNav>

    <Footer />
  </div>
  <h1>Profile</h1>
</template>

<script>
import TopNav from "../components/TopNav.vue";
import Footer from "../components/home/Footer.vue";
export default {
  components: {
    TopNav,
    Footer,
  },
};
</script>

<style>
</style>