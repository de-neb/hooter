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
                :style="{ 'background-color': user.avatar.img_bg }"
              >
                <a role="button" aria-controls="offcanvasWithBothOptions">
                  <img
                    :src="user.avatar.img_url"
                    :alt="user.username + '-display-profile'"
                    class="img-fluid"
                  />
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
                <h5 class="fw-bold m-0">
                  {{ user.first_name + " " + user.last_name }}
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
                Joined {{ user.joined_at }}
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
          name: "AllHoots",
          path: "",
          isActive: true,
        },
        {
          name: "HootsReplies",
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
    };
  },
  async created() {
    const user = await getUser(this.$route.params.username);
    this.user = user;
  },
};
</script>
