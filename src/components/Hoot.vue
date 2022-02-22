<template>
  <article class="container pt-2">
    <div class="row flex-nowrap">
      <div class="col-2 p-0">
        <div class="profile-icon-lg">
          <a role="button" aria-controls="offcanvasWithBothOptions">
            <h6 class="uname-first-letter text-light">P</h6>
          </a>
        </div>
      </div>
      <div class="col px-0 pb-2">
        <div class="row-cols-1 text-start">
          <h6 class="text-dark m-0 fw-bold d-inline">Username</h6>
          <h6 class="text-secondary m-0 d-inline">@username</h6>
        </div>
        <div class="row-cols-1 text-start">
          <h6>First Hoot</h6>
        </div>
        <ul
          class="row flex-nowrap list-unstyled m-0 justify-content-between mb-1"
        >
          <li
            class="col-2 position-relative p-0"
            v-for="(hoot, i) in hootActions"
            :key="hoot + '-' + i"
          >
            <a href="#" class="icons-bg-circle fs-6">
              <span
                class="
                  material-icons-outlined
                  lh-1
                  fs-6
                  text-secondary
                  align-middle
                "
              >
                {{ hoot }}
              </span>
            </a>
          </li>
          <!-- <span class="counter align-sub">0</span> -->
        </ul>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      hootActions: ["mode_comment", "loop", "favorite_border", "ios_share"],
    };
  },
};
</script>

