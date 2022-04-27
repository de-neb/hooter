<template>
  <MainContent v-if="user">
    <template #common-top-nav>
      <TopNav>
        <template #middle-content>
          <h6 class="fw-bold m-0">{{ user.username }}</h6>
          <span class="text-start text-secondary sub-text"
            >{{ user.hoots.length }} Hoots</span
          >
        </template>
        <template #action-button>
          <button
            v-if="showBtn"
            class="
              sub-text
              btn btn-dark
              text-light
              rounded-pill
              px-3
              fw-bold
              float-end
            "
          >
            Follow
          </button>
        </template>
      </TopNav>
    </template>
    <template #main v-if="$route.name !== 'Status'">
      <div class="container">
        <div class="row profile-banner">
          <img
            src="https://picsum.photos/1200/400"
            class="img-fluid bg-secondary p-0"
          />
        </div>
        <div class="row justify-content-between p-3 gap-2">
          <div class="col-4 p-0">
            <div class="dp-container">
              <div
                class="profile-icon-xl"
                :style="{ 'background-color': '#' + user.avatar.img_bg }"
              >
                <a role="button" aria-controls="offcanvasWithBothOptions">
                  <img
                    v-if="user.avatar.img_url"
                    :src="user.avatar.img_url"
                    :alt="user.username + '-display-profile'"
                    class="img-fluid"
                  />
                  <h1
                    v-else
                    class="uname-first-letter text-light text-capitalize"
                  >
                    {{ user.first_name[0].toUpperCase() }}
                  </h1>
                </a>
              </div>
            </div>
          </div>
          <div class="col-4 p-0">
            <button
              class="
                sub-text
                btn btn-outline-secondary
                rounded-pill
                py-2
                px-3
                text-dark
                float-end
              "
              v-if="isAuthenticatedUser"
            >
              Edit profile
            </button>
            <button
              class="
                sub-text
                btn btn-dark
                text-light
                rounded-pill
                px-3
                fw-bold
                float-end
              "
              v-else
            >
              Follow
            </button>
          </div>
          <div class="col-12 text-start p-0">
            <div class="row-cols-12 d-flex flex-column gap-2">
              <div class="col">
                <h5 class="fw-bold m-0">
                  {{ userFullName }}
                </h5>
                <h6 class="text-secondary m-0">@{{ user.username }}</h6>
              </div>
              <p class="fs-7 m-0">
                {{ user.bio }}
              </p>
              <p class="fs-7 text-secondary m-0">
                <span class="material-icons-outlined fs-6 lh-1 align-middle">
                  calendar_month
                </span>
                Joined {{ formattedJoinedDate }}
              </p>
              <div class="col fs-7 text-secondary m-0">
                <span class="fw-bold text-dark align-middle">{{
                  user.followers
                }}</span>
                <span class="align-middle ms-1">Following</span>
                <span class="fw-bold text-dark align-middle ms-3">{{
                  user.following
                }}</span>
                <span class="align-middle ms-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row tab-height">
          <Tabs
            :tabs="profileTabs"
            :baseUrl="`/user/${$route.params.username}`"
          ></Tabs>
        </div>
      </div>
      <router-view v-bind="{ user }"></router-view>
    </template>
    <template #status v-else>
      <router-view v-bind="{ user }"></router-view>
    </template>
  </MainContent>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getUser } from "@/services/RequestService.js";
import MainContent from "@/components/MainContent.vue";
import TopNav from "@/components/TopNav.vue";
import Tabs from "@/components/Tabs.vue";
export default {
  components: {
    MainContent,
    TopNav,
    Tabs,
  },

  data() {
    return {
      profileTabs: [
        {
          name: "Hoots",
          path: "",
          isActive: true,
        },
        {
          name: "Hoots & replies",
          path: "with-replies",
          isActive: false,
        },
        {
          name: "Media",
          path: "media",
          isActive: false,
        },
        {
          name: "Likes",
          path: "likes",
          isActive: false,
        },
      ],
      user: null,
      showBtn: false,
    };
  },
  methods: {
    handleScroll() {
      if (window.top.scrollY > 200) {
        this.showBtn = true;
      } else {
        this.showBtn = false;
      }
    },
  },
  computed: {
    ...mapState("user", ["username"]),
    ...mapGetters("date", ["getMonthName"]),
    userFullName() {
      if (this.user.last_name)
        return this.user.first_name + " " + this.user.last_name;
      else return this.user.first_name;
    },
    formattedJoinedDate() {
      const date = new Date(this.user.joined_at);
      const monthName = this.getMonthName("long")[date.getMonth()];
      const fullYear = date.getFullYear();
      return `${monthName} ${fullYear}`;
    },
    isAuthenticatedUser() {
      return this.username === this.user.username;
    },
  },
  async created() {
    const user = await getUser(this.$route.params.username);
    this.user = user;
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
