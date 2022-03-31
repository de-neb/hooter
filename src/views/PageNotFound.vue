<template>
  <MainContent>
    <template #home-header>
      <TopNav>
        <template #middle-content>
          <h6 class="fw-bold m-0">Not found</h6>
        </template>
      </TopNav>
    </template>
    <template #main>
      <div class="container my-2">
        <div class="row justify-content-center px-3 gap-2">
          <div class="col d-grid p-0">
            <router-link
              :to="{ path: '/login' }"
              class="btn btn-outline-teak rounded-pill fw-bold fs-7"
            >
              Log in
            </router-link>
          </div>
          <div class="col d-grid p-0">
            <router-link
              :to="{ path: '/signup' }"
              class="btn btn-secondary rounded-pill fw-bold fs-7"
            >
              Sign up
            </router-link>
          </div>
        </div>
      </div>
      <div class="container py-5">
        <div class="row p-4 justify-content-center">
          <p class="text-secondary fs-7">
            Hmm...this page doesn't exist. Try searching for something else.
          </p>
          <div class="col-3 p-0">
            <button
              class="btn btn-secondary rounded-pill fs-7 px-3"
              @click="$router.push('/explore')"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </template>
  </MainContent>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
import MainContent from "@/components/MainContent.vue";
export default {
  components: {
    TopNav,
    MainContent,
  },
};
</script>
