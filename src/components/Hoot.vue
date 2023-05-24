<template>
  <article class="container pt-2" @click="handleHootClick">
    <div class="row flex-nowrap">
      <div class="col-2 p-0">
        <div class="click-wrapper" @click.stop>
          <div
            class="profile-icon-lg"
            :style="{
              'background-color': avatar.img_bg.includes('#')
                ? avatar.img_bg
                : '#' + avatar.img_bg,
            }"
          >
            <router-link
              :to="{ name: 'Hoots', params: { username: username } }"
              role="button"
              aria-controls="offcanvasWithBothOptions"
            >
              <img
                :src="avatar.img_url"
                :alt="username + '-dp'"
                class="img-fluid"
                v-if="avatar.img_url"
              />
              <h3 class="uname-first-letter text-light" v-else>
                {{ firstName[0].toUpperCase() }}
              </h3>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col px-0 pb-2">
        <div
          class="
            row-cols-auto
            d-flex
            flex-row flex-wrap
            align-items-center
            gap-1
          "
        >
          <div class="col">
            <h6 class="text-dark m-0 fw-bold">
              {{ `${firstName} ${lastName ? lastName : ""}` }}
            </h6>
          </div>
          <div class="col">
            <h6 class="text-secondary m-0">@{{ username }}</h6>
          </div>
          <div class="col ms-auto position-relative" v-if="hootBelongsToUser">
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
          <div class="col-12 media-max-size mt-2" v-if="hasMedia">
            <img
              :src="`https://picsum.photos/${media.width}/${media.length}`"
              class="img-fluid"
              :alt="username + '-media'"
            />
          </div>
        </div>

        <!-- hoot content end -->
        <HootActions v-bind="actionProps" />
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
      <div class="offcanvas-body small px-2 pt-2">
        <h6
          class="offcanvas-title text-start text-danger"
          @click="handleDelete"
        >
          <span class="material-icons-outlined align-middle fs-5 px-3 py-2">
            delete_outline </span
          >Delete
        </h6>
        <h6 class="offcanvas-title text-start">
          <span class="material-icons-outlined align-middle fs-5 px-3 py-2">
            push_pin </span
          >Pin to your profile
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
import { updateHootStats } from "@/services/RequestService.js";
import HootActions from "../components/HootActions.vue";
export default {
  components: {
    HootActions,
  },
  props: {
    uid: String,
    firstName: String,
    lastName: String,
    username: String,
    avatar: Object,
    hootId: String,
    hasMedia: Boolean,
    media: Array,
    hootText: String,
    rehoots: Number,
    likes: Number,
    totalComments: Number,
    isComment: Boolean,
    commentId: String,
  },
  data() {
    return {};
  },
  methods: {
    removeDoubleBackdrop() {
      const backdrops = document.querySelectorAll(".offcanvas-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
    },
    handleHootClick() {
      if (!this.isComment)
        this.$router.push(`/user/${this.username}/status/${this.hootId}`);
      this.$emit("comment-clicked");
    },
    async handleDelete() {
      console.log("delete comment id", this.commentId);
      const comment = {
        comment_id: this.commentId,
      };
      const res = await updateHootStats(this.hootId, "delete_comment", comment);
      console.log("response", res);
      this.$emit("comment-deleted");
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user.username;
    },
    actionProps() {
      return {
        uid: this.uid,
        hootId: this.hootId,
        comments: this.total_comments,
        rehoots: this.rehoots,
        likes: this.likes,
      };
    },
    hootBelongsToUser() {
      return (
        this.$route.path === "/user/" + this.username ||
        this.username === this.loggedInUser
      );
    },
  },
};
</script>

