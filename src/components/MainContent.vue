<template>
  <div class="container p-0">
    <header class="home-header">
      <nav
        class="
          navbar navbar-expand-lg navbar-light
          p-0
          align-items-stretch
          h-100
        "
      >
        <div class="container-sm justify-content-evenly">
          <div class="row w-100 align-items-center h-100 gap-3">
            <div class="col text-start p-0">
              <div class="profile-icon-sm">
                <a
                  data-bs-toggle="offcanvas"
                  href="#profile-offcanvas"
                  role="button"
                  aria-controls="offcanvasWithBothOptions"
                >
                  <h6 class="uname-first-letter text-light">P</h6>
                </a>
              </div>
            </div>
            <div class="col-9 p-0">
              <h6
                class="my-2 text-start fw-bold"
                v-if="$route.path != '/explore'"
              >
                {{ $route.name }}
              </h6>
              <div class="search-box text-secondary" v-else>
                <span class="material-icons-outlined search-icon">
                  search
                </span>
                <input
                  type="text"
                  class="search-input"
                  placeholder="Search Hooter"
                />
              </div>
            </div>
            <div class="col p-0 position-relative h-100">
              <span class="material-icons-outlined sparkle fs-4">
                {{ $route.path == "/explore" ? "settings" : "auto_awesome" }}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main class="flex-grow-1">
      <div class="filler"></div>
      <h1>some content...</h1>
      <slot name="main"></slot>
      <div class="filler"></div>
    </main>
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
          <div class="profile-icon-lg mb-1">
            <h3 class="uname-first-letter text-light">P</h3>
          </div>
        </div>
        <div class="container p-15px text-start">
          <h6 class="m-0 fw-bold">User Name</h6>
          <h6 class="m-0 text-secondary">@username</h6>
        </div>
        <div class="container p-15px text-start">
          <span>{1} following</span>
          <span>{0} followers</span>
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
    <aside class="compose">
      <router-link to="/compose" class="position-relative">
        <img src="../assets/feather.svg" />
      </router-link>
    </aside>

    <footer class="home-footer">
      <nav class="container pt-1 px-0">
        <ul class="row flex-nowrap list-unstyled m-0">
          <li
            class="col h-100"
            v-for="(page, i) in footerPages"
            :key="page.name + '-' + i"
          >
            <router-link
              :to="page.link"
              class="
                text-dark
                position-relative
                h-100
                center-item
                text-decoration-none
              "
            >
              <span class="icons-bg-circle" :class="iconClass(page.link)">
                {{ page.name }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerPages: [
        {
          name: "home",
          link: "/home",
        },
        {
          name: "search",
          link: "/explore",
        },
        {
          name: "notifications",
          link: "/notifications",
        },
        {
          name: "email",
          link: "/messages",
        },
      ],
      profileNavLinks: [
        {
          icon: "person",
          name: "Profile",
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
      isActive: false,
    };
  },
  methods: {
    iconClass(link) {
      if (this.$route.path === link && link === "/explore") {
        return "material-icons fw-bold";
      } else if (this.$route.path === link) {
        return "material-icons";
      }
      return "material-icons-outlined";
    },
  },
};
</script>

<style>
</style>