<template>
  <article class="container pt-2" v-if="user">
    <div class="row flex-nowrap px-3 flex-column">
      <div class="row p-0 m-0">
        <div class="row m-0 p-0" @click.stop>
          <div class="col-2 p-0">
            <div
              class="profile-icon-lg"
              :style="{ 'background-color': user.avatar.img_bg }"
            >
              <router-link
                :to="{ name: 'AllHoots', params: { username: user.username } }"
                role="button"
                aria-controls="offcanvasWithBothOptions"
              >
                <img
                  :src="user.avatar.img_url"
                  :alt="user.username + '-dp'"
                  class="img-fluid"
                  v-if="user.avatar"
                />
                <h2 class="uname-first-letter text-light" v-else>P</h2>
              </router-link>
            </div>
          </div>
          <div
            class="
              col-10
              my-2
              p-0
              d-flex
              flex-column flex-nowrap
              align-items-start
            "
          >
            <h6 class="text-dark m-0 fw-bold">
              {{ `${user.first_name} ${user.last_name}` }}
            </h6>
            <h6 class="text-secondary m-0">@{{ user.username }}</h6>
            <div
              class="col ms-auto position-relative"
              v-if="$route.path === '/user/' + user.username"
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
        </div>
      </div>
      <div class="row m-0 p-0 pb-2">
        <!-- hoot content start-->
        <div class="row-cols-1 text-start my-1 p-0">
          <div class="col-12">
            <p class="fs-4 lh-sm m-0">
              {{ hoot.text }}
            </p>
          </div>
          <div class="col-12 media-max-size mt-2" v-if="hoot.media">
            <img
              :src="`https://picsum.photos/${hoot.media[0].width}/${hoot.media[0].height}`"
              class="img-fluid"
              :alt="user.username + '-media'"
            />
          </div>
        </div>

        <!-- hoot content end -->
        <div class="row m-0 px-0 py-3 text-start">
          <h6 class="text-secondary m-0 p-0">{{ dateCreated }}</h6>
        </div>
        <HootActions v-bind="hootStatus" />
      </div>
    </div>
  </article>
</template>

<script>
import HootActions from "@/components/HootActions.vue";
export default {
  components: {
    HootActions,
  },
  props: {
    user: Object,
  },
  computed: {
    dateCreated() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const date = new Date(this.hoot.created_at);
      return date.toLocaleDateString(date, options);
    },
    hoot() {
      const result = this.user.hoots.filter(
        (hoot) => hoot._id === this.$route.params.hootId
      );
      return result[0];
    },
    hootStatus() {
      return {
        uid: this.user._id,
        hootId: this.hoot.id,
        comments: this.hoot.comments.length,
        rehoots: this.hoot.rehoot,
        likes: this.hoot.likes,
        inStatus: true,
      };
    },
  },
  mounted() {},
};
</script>

<style>
</style>