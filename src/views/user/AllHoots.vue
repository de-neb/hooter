<template>
  <section id="hoots">
    <div class="container border-top border-bottom px-3">
      <Hoot
        :username="user.username"
        :firstName="user.first_name"
        :lastName="user.last_name"
        :avatar="user.avatar"
        :uid="user._id"
        v-bind="
          hootProps(
            hoot._id,
            hoot.has_media,
            hoot.media,
            hoot.text,
            hoot.rehoot,
            hoot.likes,
            hoot.comments
          )
        "
        v-for="hoot in user.hoots"
        :key="hoot._id"
      />
    </div>
  </section>
</template>

<script>
import Hoot from "@/components/Hoot.vue";
export default {
  components: {
    Hoot,
  },
  props: {
    user: Object,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    hootProps(hootId, hasMedia, media, hootText, rehoots, likes, comments) {
      return {
        hootId,
        hasMedia,
        media,
        hootText,
        rehoots,
        likes,
        comments,
      };
    },
  },
};
</script>

<style>
</style>