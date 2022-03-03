<template>
  <div class="container border-top border-bottom px-3">
    <Hoot
      v-for="user in usersDb"
      :key="user._id"
      v-bind="
        hootProps(
          user._id,
          user.first_name,
          user.last_name,
          user.username,
          user.avatar,
          randomHoot(user.hoots)
        )
      "
    >
    </Hoot>
  </div>
  <Spinner v-if="isFetchingData" />
</template>

<script>
import { getHomeData } from "../../services/RequestService";
import Spinner from "@/components/Spinner.vue";
import Hoot from "@/components/Hoot.vue";

export default {
  components: {
    Hoot,
    Spinner,
  },
  data() {
    return {
      usersDb: [],
      randomIndex: 1,
      isFetchingData: false,
      pageCounter: 0,
    };
  },
  methods: {
    async getHomeFeed() {
      this.isFetchingData = true;
      this.usersDb = await getHomeData(1);
      this.isFetchingData = false;
    },
    randomHoot(arr) {
      const index = Math.floor(Math.random() * arr.length);
      return arr[index];
    },
    hootProps(uid, fname, lname, username, avatar, hoot) {
      return {
        uid,
        firstName: fname,
        lastName: lname,
        username,
        avatar,
        hootId: hoot._id,
        media: hoot.media,
        hootText: hoot.text,
        rehoots: hoot.rehoot,
        likes: hoot.likes,
        comments: hoot.comments,
      };
    },
    getNextUsers() {
      window.onscroll = async () => {
        const bottomOfWindow =
          document.documentElement.scrollTop ===
          document.documentElement.scrollHeight -
            document.documentElement.offsetHeight;
        if (bottomOfWindow && this.pageCounter <= 20) {
          this.pageCounter++;
          this.isFetchingData = true;
          const data = await getHomeData(this.pageCounter);
          this.usersDb = this.usersDb.concat(data);
          this.isFetchingData = false;
        }
      };
    },
  },
  computed: {},
  mounted() {
    this.getHomeFeed();
    this.getNextUsers();
  },
};
</script>

