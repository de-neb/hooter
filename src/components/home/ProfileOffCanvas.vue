<template>
  <aside
    class="offcanvas offcanvas-start w-75"
    id="profile-offcanvas"
    data-bs-scroll="true"
    tabindex="-1"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header">
      <h6 class="offcanvas-title fw-bold">Account info</h6>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body pb-5 px-0 pt-0">
      <div class="container p-2">
        <router-link :to="'/user/' + userObj.username">
          <div class="profile-icon-md mb-1">
            <h3 class="uname-first-letter text-light text-capitalize">
              {{ userObj.first_name[0] }}
            </h3>
          </div>
        </router-link>
      </div>
      <div class="container p-15px text-start">
        <h6 class="m-0 fw-bold text-capitalize">{{ userObj.first_name }}</h6>
        <h6 class="m-0 text-secondary">@{{ userObj.username }}</h6>
      </div>
      <div class="container p-15px text-start">
        <span class="fs-7 me-1 fw-bold">{{ userObj.following }} </span>
        <span class="fs-7 me-2">following</span>
        <span class="fs-7 me-1 fw-bold">{{ userObj.followers }}</span>
        <span class="fs-7 me-1">followers</span>
      </div>
      <div
        class="d-flex flex-nowrap p-15px text-start gap-2"
        v-for="(link, i) in profileNavLinks"
        :key="`${link}-${i}`"
      >
        <span class="material-icons-outlined sm-icon">{{ link.icon }}</span>
        <h6 class="text-start m-0 flex-grow-1">{{ link.name }}</h6>
      </div>
      <div class="container p-15px text-start">
        <h6 class="m-0">Log out</h6>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      profileNavLinks: [
        {
          icon: "person",
          name: "Profile",
          link: "/user",
        },
        {
          icon: "article",
          name: "Lists",
        },
        {
          icon: "topic",
          name: "Topics",
        },
        {
          icon: "turned_in_not",
          name: "Bookmarks",
        },
        {
          icon: "bolt",
          name: "Moments",
        },
        {
          icon: "wysiwyg",
          name: "Newsletters",
        },
        {
          icon: "rocket_launch",
          name: "Hooter for Professionals",
        },
        {
          icon: "north_east",
          name: "Hooter Ads",
        },
        {
          icon: "analytics",
          name: "Analytics",
        },
        {
          icon: "settings",
          name: "Settings and Privacy",
        },
        {
          icon: "help_outline",
          name: "Help Center",
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["userObj"]),
  },
};
</script>


