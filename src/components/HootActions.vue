<template>
  <ul
    class="container flex-nowrap list-unstyled m-0 p-0 justify-content-between"
    v-if="inStatus"
  >
    <div class="row m-0 gap-2">
      <div
        class="col-auto px-1 py-3 d-flex flex-row align-items-center gap-1"
        v-for="(status, i) in hootStatusCount"
        :key="status + '-' + i"
      >
        <h6 class="fw-bold m-0">{{ status.count }}</h6>
        <h6 class="text-secondary m-0">{{ status.name }}</h6>
      </div>
    </div>

    <div class="row m-0 flex-row">
      <li
        class="
          col
          p-0
          m-0
          d-flex
          flex-nowrap
          justify-content-around
          align-items-center
        "
        v-for="(action, i) in actions"
        :key="action + '-' + i"
      >
        <a class="col-12 position-relative fs-6 p-0">
          <input
            type="checkbox"
            :id="action + '-' + hootId"
            v-if="i === 2"
            v-model="isLiked"
            class="heart-checkbox"
            hidden
          />
          <label
            :for="action + '-' + hootId"
            :class="{
              'hearted overwrite': i === 2 && isLiked,
            }"
            class="material-icons-outlined fs-5 icons-bg-circle text-secondary"
          >
            {{ action }}
          </label>
        </a>
      </li>
    </div>
  </ul>
  <ul
    class="row flex-nowrap list-unstyled m-0 justify-content-between mb-1"
    @click.stop
    v-else
  >
    <div
      :class="{ 'col-1': i === 3, 'col-3': i < 3 }"
      v-for="(action, i) in actions"
      :key="action + '-' + i"
    >
      <li class="row p-0 flex-nowrap justify-content-around align-items-center">
        <a
          class="position-relative fs-6 p-0"
          :class="{ 'col-12': i === 3, 'col-3': i < 3 }"
        >
          <input
            type="checkbox"
            :id="action + '-' + hootId"
            v-if="i === 2"
            v-model="isLiked"
            class="heart-checkbox"
            hidden
          />
          <label
            :for="action + '-' + hootId"
            :class="{
              hearted: i === 2 && isLiked,
            }"
            class="
              material-icons-outlined
              lh-1
              fs-6
              align-middle
              icons-bg-circle
              text-secondary
            "
          >
            {{ action }}
          </label>
        </a>
        <span
          class="col-6 p-0 sub-text counter text-start"
          :class="i === 2 ? counterAnimationName : ''"
          v-if="i < 3"
          >{{ returnRespectiveCounts(action) }}</span
        >
      </li>
    </div>
  </ul>
</template>

<script>
import { updateHootStats } from "../services/RequestService";

export default {
  props: {
    uid: String,
    hootId: String,
    comments: Number,
    rehoots: Number,
    likes: Number,
    inStatus: Boolean,
  },
  data() {
    return {
      actions: ["mode_comment", "loop", "favorite_border", "ios_share"],
      isLiked: false,
      counterAnimationName: "counter-initial",
      hootStatus: { likes: 0, rehoots: 0 },
    };
  },
  methods: {
    returnRespectiveCounts(action) {
      switch (action) {
        case "mode_comment":
          return this.comments;
        case "loop":
          return this.rehoots;
        case "favorite_border":
          return this.finalLikeCount;
      }
    },
    async updateHootLikes(action) {
      const { hoot_status } = await updateHootStats(this.hootId, action);
      this.hootStatus = hoot_status;
    },
    playCounterAnimation(callback) {
      // Old number goes up
      setTimeout(() => (this.counterAnimationName = "counter-up"), 0);
      // Incrementing the counter
      setTimeout(() => {
        callback;
      }, 100);
      //New number waits down
      setTimeout(() => (this.counterAnimationName = "counter-down"), 100);
      //New number stays in the middle
      setTimeout(() => (this.counterAnimationName = "initial"), 200);
    },
    checkCount(count, name) {
      return count ? { name, count } : null;
    },
  },
  computed: {
    finalLikeCount() {
      return this.likes > this.hootStatus.likes
        ? this.likes
        : this.hootStatus.likes;
    },
    hootStatusCount() {
      return [
        this.checkCount(this.comments, "Comments"),
        this.checkCount(this.rehoots, "Rehoots"),
        this.checkCount(this.finalLikeCount, "Likes"),
      ].filter((el) => el);
    },
  },
  watch: {
    isLiked(newVal) {
      if (newVal) this.playCounterAnimation(this.updateHootLikes("like_hoot"));
      else this.playCounterAnimation(this.updateHootLikes("unlike_hoot"));
    },
  },
};
</script>

<style scoped>
.overwrite {
  width: 48px;
  height: 16px;
  position: relative;
  top: -8px;
  left: 0;
}
</style>