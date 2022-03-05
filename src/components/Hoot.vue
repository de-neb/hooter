<template>
  <article class="container pt-2" @click="handleHootClick">
    <div class="row flex-nowrap">
      <div class="col-2 p-0">
        <div class="click-wrapper" @click.stop>
          <div
            class="profile-icon-lg"
            :style="{ 'background-color': avatar.img_bg }"
          >
            <router-link
              :to="{ name: 'AllHoots', params: { username: username } }"
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
            v-if="$route.path === '/user/' + username"
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
    media: Array,
    hootText: String,
    rehoots: Number,
    likes: Number,
    comments: Array,
  },
  data() {
    return {
      options: [
        {
          name: "Delete",
          icon: "delete_outline ",
        },
        { name: "Pin to your profile", icon: "push_pin" },
      ],
    };
  },
  methods: {
    removeDoubleBackdrop() {
      const backdrops = document.querySelectorAll(".offcanvas-backdrop");
      backdrops.forEach((backdrop) => backdrop.remove());
    },
    handleHootClick() {
      this.$router.push(`/user/${this.username}/status/${this.hootId}`);
    },
  },
  computed: {
    actionProps() {
      return {
        uid: this.uid,
        hootId: this.hootId,
        comments: this.comments.length,
        rehoots: this.rehoots,
        likes: this.likes,
      };
    },
  },
};
</script>

