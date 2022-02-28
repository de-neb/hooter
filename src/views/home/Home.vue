<template>
  <MainContent>
    <template #home-header>
      <Header />
    </template>

    <template #main>
      <Spinner v-if="isLoading && $route.path === '/home'" />
      <div
        class="container border-top border-bottom px-3"
        v-else-if="!isLoading && $route.path === '/home'"
      >
        <Hoot
          v-for="user in usersDb"
          :key="user._id.$oid"
          v-bind="
            hootProps(
              user.first_name,
              user.last_name,
              user.username,
              user.avatar,
              randomHoot(user.hoots)
            )
          "
        >
          <template #content-text>
            <p>{{ user.hoots[refIndex].text }}</p>
          </template>
        </Hoot>
      </div>
      <router-view></router-view>
    </template>
  </MainContent>
</template>

<script>
import { getHomeData } from "../../services/RequestService";
import Header from "@/components/home/Header.vue";
import MainContent from "@/components/MainContent.vue";
import Hoot from "@/components/Hoot.vue";
import Spinner from "@/components/Spinner.vue";
export default {
  components: {
    MainContent,
    Header,
    Hoot,
    Spinner,
  },
  data() {
    return {
      usersDb: [],
      isLoading: false,
      refIndex: null,
    };
  },
  methods: {
    randomHoot(arr) {
      const index = Math.floor(Math.random() * arr.length);
      this.refIndex = index;
      return arr[index];
    },
    hootProps(fname, lname, username, avatar, hoot) {
      return {
        firstName: fname,
        lastName: lname,
        username,
        avatar,
        rehoots: hoot.rehoot,
        likes: hoot.likes,
        comments: hoot.comments.length,
      };
    },
  },
  computed: {},
  watch: {
    $route: {
      handler: async function (to) {
        if (to.path === "/home") {
          this.isLoading = true;
          this.usersDb = await getHomeData();
          this.isLoading = false;
        }
      },
    },
  },
  async mounted() {
    this.isLoading = true;
    this.usersDb = await getHomeData();
    this.isLoading = false;
  },
};
</script>

<style>
</style>