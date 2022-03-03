<template>
  <article class="container pt-2">
    <div class="row flex-nowrap">
      <div class="col-2 p-0">
        <div
          class="profile-icon-lg"
          :style="{ 'background-color': avatar.img_bg }"
        >
          <router-link
            :to="'/' + username"
            role="button"
            aria-controls="offcanvasWithBothOptions"
          >
            <img
              :src="avatar.img_url"
              :alt="username + '-dp'"
              class="img-fluid"
              v-if="avatar"
            />
            <h6 class="uname-first-letter text-light" v-else>P</h6>
          </router-link>
        </div>
      </div>
      <div class="col px-0 pb-2">
        <div
          class="
            row-cols-auto
            d-flex
            flex-row flex-nowrap
            align-items-center
            gap-1
          "
        >
          <div class="col">
            <h6 class="text-dark m-0 fw-bold">
              {{ `${firstName} ${lastName}` }}
            </h6>
          </div>
          <div class="col">
            <h6 class="text-secondary m-0">@{{ username }}</h6>
          </div>
          <div
            class="col ms-auto position-relative"
            v-if="$route.path === '/user'"
          >
            <button
              class="
                border-0
                bg-transparent
                p-0
                rounded-circle
                icons-bg-circle
                fs-6
              "
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
            >
              <span class="material-icons-outlined lh-1 fs-6 align-middle">
                more_horiz
              </span>
            </button>
          </div>
        </div>

        <!-- hoot content start-->
        <div class="row-cols-1 text-start my-1">
          <div class="col-12">
            <p class="fs-7 m-0">
              {{ hootText }}
            </p>
          </div>
          <div class="col-12 media-max-size mt-2" v-if="media">
            <img
              :src="`https://picsum.photos/${media[0].width}/${media[0].height}`"
              class="img-fluid"
              alt=""
            />
          </div>
        </div>

        <!-- hoot content end -->

        <ul
          class="row flex-nowrap list-unstyled m-0 justify-content-between mb-1"
        >
          <div
            :class="{ 'col-1': i === 3, 'col-3': i < 3 }"
            v-for="(action, i) in hootActions"
            :key="action + '-' + i"
          >
            <li
              class="
                row
                p-0
                flex-nowrap
                justify-content-around
                align-items-center
              "
            >
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
      </div>
    </div>
  </article>
  <!-- offcanvas delete options -->
  <aside>
    <div
      class="offcanvas offcanvas-bottom options-border"
      tabindex="-1"
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-body small">
        <h6
          class="offcanvas-title text-start"
          :class="{ 'text-danger': i === 0 }"
          v-for="(option, i) in options"
          :key="option + '-' + i"
        >
          <span class="material-icons-outlined align-middle fs-5 px-2">
            {{ option.icon }} </span
          >{{ option.name }}
        </h6>
      </div>
      <div class="offcanvas-footer p-3">
        <button
          type="button"
          class="btn btn-outline-secondary w-100 rounded-pill"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          @click="removeDoubleBackdrop()"
        >
          Cancel
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { updateHootStats } from "../services/RequestService";
export default {
  props: {
    uid: String,
    firstName: String,
    lastName: String,
    username: String,
    avatar: Object,
    hootId: String,
    media: Array,
    hootText: String,
    rehoots: Number,
    likes: Number,
    comments: Array,
  },
  data() {
    return {
      hootActions: ["mode_comment", "loop", "favorite_border", "ios_share"],
      options: [
        {
          name: "Delete",
          icon: "delete_outline ",
        },
        { name: "Pin to your profile", icon: "push_pin" },
      ],
      isLiked: false,
      counterAnimationName: "counter-initial",
      newLikes: 0,
    };
  },
  methods: {
    removeDoubleBackdrop() {
      const backdrops = document.querySelectorAll(".offcanvas-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
    },
    returnRespectiveCounts(action) {
      switch (action) {
        case "mode_comment":
          return this.comments.length;
        case "loop":
          return this.rehoots;
        case "favorite_border":
          return this.likes > this.newLikes ? this.likes : this.newLikes;
      }
    },
    async updateHootLikes(action) {
      const { hoot_status } = await updateHootStats(
        this.uid,
        this.hootId,
        action
      );
      this.newLikes = hoot_status.likes;
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
  },
  computed: {
    randomProfileBg() {
      const hex = Math.floor(Math.random() * 16777215).toString(16);
      return `#${hex}`;
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
.media-max-size {
  max-height: 380px !important;
  min-width: 284px;
  overflow: hidden;
  border-radius: 15px;
}
</style>
