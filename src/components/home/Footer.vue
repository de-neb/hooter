<template>
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