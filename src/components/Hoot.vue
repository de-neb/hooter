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
            <h6 class="text-dark m-0 fw-bold">Username</h6>
          </div>
          <div class="col">
            <h6 class="text-secondary m-0">@username</h6>
          </div>
          <div class="col ms-auto position-relative">
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
        <div class="row-cols-1 text-start my-1">
          <h6>First Hoot</h6>
        </div>
        <ul
          class="row flex-nowrap list-unstyled m-0 justify-content-between mb-1"
        >
          <li
            class="col-1 position-relative p-0"
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
        >
          Cancel
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      hootActions: ["mode_comment", "loop", "favorite_border", "ios_share"],
      options: [
        {
          name: "Delete",
          icon: "delete_outline ",
        },
        { name: "Pin to your profile", icon: "push_pin" },
      ],
    };
  },
};
</script>

