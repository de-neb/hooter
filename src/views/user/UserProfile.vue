<template>
  <MainContent>
    <template #common-top-nav>
      <TopNav>
        <template #middle-content>
          <h6 class="fw-bold m-0">User Name</h6>
          <span class="text-start text-secondary sub-text">0 Hoots</span>
        </template>
      </TopNav>
    </template>
    <template #main>
      <div class="container">
        <div class="row profile-banner">
          <img src="" alt="" class="img-fluid bg-secondary" />
        </div>
        <div class="row justify-content-between p-3 gap-2">
          <div class="col-4 p-0">
            <div class="dp-container">
              <div class="profile-icon-xl">
                <a role="button" aria-controls="offcanvasWithBothOptions">
                  <h6 class="uname-first-letter text-light">P</h6>
                </a>
              </div>
            </div>
          </div>
          <div class="col-4 p-0">
            <button
              class="
                btn btn-outline-secondary
                rounded-pill
                py-1
                text-dark
                float-end
              "
            >
              Edit profile
            </button>
          </div>
          <div class="col-12 text-start p-0">
            <div class="row-cols-12 d-flex flex-column gap-2">
              <div class="col">
                <h5 class="fw-bold m-0">User Name</h5>
                <h6 class="text-secondary m-0">@username</h6>
              </div>
              <h6 class="text-secondary m-0">
                <span class="material-icons-outlined fs-6 lh-1 align-middle">
                  calendar_month
                </span>
                Joined January 2022
              </h6>
              <h6 class="text-secondary m-0">
                <span class="fw-bold text-dark align-middle">0</span> Following
                <span class="fw-bold text-dark align-middle">1</span> Followers
              </h6>
            </div>
          </div>
        </div>
        <div class="row tab-height">
          <ul class="nav justify-content-between p-0 flex-nowrap">
            <li
              class="nav-item h-100 px-3"
              :class="{ 'tab-hover': tab.isActive }"
              v-for="(tab, i) in profileTabs"
              :key="tab + '_' + i"
            >
              <span
                class="h-100 d-inline-flex"
                :class="{ 'active-tab': tab.isActive }"
              >
                <router-link
                  class="nav-link active p-0 align-self-center text-secondary"
                  :to="tab.link"
                  @click="goToSelectedTab(tab.name)"
                  >{{ tab.name }}</router-link
                >
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="container border-top border-bottom px-3"
        v-if="$route.path == '/user'"
      >
        <Hoot />
      </div>
      <router-view></router-view>
    </template>
  </MainContent>
</template>

<script>
import MainContent from "@/components/MainContent.vue";
import TopNav from "@/components/TopNav.vue";
import Hoot from "@/components/Hoot.vue";
export default {
  components: {
    MainContent,
    TopNav,
    Hoot,
  },
  data() {
    return {
      profileTabs: [
        {
          name: "Hoots",
          link: "/user",
          isActive: true,
        },
        {
          name: "Hoots & Replies",
          link: "/with-replies",
          isActive: false,
        },
        {
          name: "Media",
          link: "/media",
          isActive: false,
        },
        {
          name: "Likes",
          link: "/likes",
          isActive: false,
        },
      ],
    };
  },
  methods: {
    goToSelectedTab(name) {
      this.profileTabs.forEach((tab) => {
        if (tab.name === name) {
          tab.isActive = true;
        } else {
          tab.isActive = false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>