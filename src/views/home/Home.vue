<template>
  <MainContent>
    <template #home-header>
      <Header />
    </template>
    <template #main>
      <router-view></router-view>
    </template>
  </MainContent>
</template>

<script>
import Header from "@/components/home/Header.vue";
import MainContent from "@/components/MainContent.vue";
export default {
  components: {
    MainContent,
    Header,
  },
};
</script>

<style>
</style>