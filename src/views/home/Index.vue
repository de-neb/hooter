<template>
  <div class="container border-top border-bottom px-3">
    <Hoot
      v-for="post in feed"
      :key="post._id"
      v-bind="
        hootProps(
          post._id,
          post.author.first_name,
          post.author.last_name,
          post.author.username,
          post.author.avatar,
          post.has_media,
          post.media,
          post.likes,
          post.rehoot,
          post.text,
          post.total_comments
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
      feed: [],
      randomIndex: 1,
      isFetchingData: false,
      pageCounter: 0,
    };
  },
  methods: {
    async getHomeFeed() {
      this.isFetchingData = true;
      this.feed = await getHomeData(1);
      console.log("data", this.feed);
      this.isFetchingData = false;
    },
    randomHoot(arr) {
      if (arr) {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
      }
    },
    hootProps(
      _id,
      fname,
      lname,
      username,
      avatar,
      has_media,
      media,
      likes,
      rehoot,
      text,
      total_comments
    ) {
      return {
        // uid,
        firstName: fname,
        lastName: lname,
        username,
        avatar,
        hootId: _id,
        hasMedia: has_media,
        media: media,
        hootText: text,
        rehoots: rehoot,
        likes,
        totalComments: total_comments,
      };
    },
    getNextUsers() {
      window.onscroll = async () => {
        const bottomOfWindow =
          parseInt(document.documentElement.scrollTop) ===
          document.documentElement.scrollHeight -
            document.documentElement.offsetHeight;
        if (bottomOfWindow && this.pageCounter <= 20) {
          this.pageCounter++;
          this.isFetchingData = true;
          const data = await getHomeData(this.pageCounter);
          console.log("data", data);
          this.feed = this.feed.concat(data);
          this.isFetchingData = false;
        }
      };
    },
  },
  computed: {},
  created() {
    this.getHomeFeed();
    this.getNextUsers();
  },
};
</script>

