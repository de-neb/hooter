<template>
  <MainContent v-if="userObj">
    <template #home-header>
      <Header
        :first-name="userObj.first_name"
        :img-bg="userObj.avatar.img_bg"
      />
    </template>
    <template #main>
      <router-view></router-view>
    </template>
  </MainContent>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Header from "@/components/home/Header.vue";
import MainContent from "@/components/MainContent.vue";
export default {
  components: {
    MainContent,
    Header,
  },

  methods: {
    ...mapMutations("user", ["SET_USER_FULL_INFO"]),
    ...mapActions("user", ["getUser"]),
  },
  computed: {
    ...mapState("user", ["name", "username", "userObj"]),
    userObjModel: {
      get() {
        return this.userObj;
      },
      set(val) {
        this.SET_USER_FULL_INFO(val);
      },
    },
  },
  async created() {
    this.userObjModel = await this.getUser(this.username);
  },
};
</script>

<style>
</style>