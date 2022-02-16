<template>
  <div class="container home-header">
    <nav class="row h-100 justify-content-between m-0 px-3 py-0">
      <div
        class="
          col-2
          p-0
          d-flex
          align-items-center
          justify-content-start
          h-100
          position-relative
        "
      >
        <router-link to="#" class="position-relative">
          <span class="material-icons-outlined text-dark icons-bg-circle fs-5">
            arrow_back
          </span>
        </router-link>
      </div>

      <div
        class="col-3 p-0 d-flex justify-content-end align-items-center h-100"
      >
        <button
          class="btn btn-secondary rounded-pill fw-bold text-light px-3 py-1"
        >
          Hoot
        </button>
      </div>
    </nav>
    <main>
      <article class="container px-3">
        <div class="row justify-content-between m-0">
          <div class="col-2 p-0">
            <div class="profile-icon-lg">
              <h3 class="uname-first-letter text-light">P</h3>
            </div>
          </div>
          <div class="col-10 p-0">
            <div class="row-cols-1">
              <textarea
                type="text"
                class="compose-input-text w-100"
                placeholder="What's happening?"
                @input="autoHeight"
                ref="textarea"
                max-length="280"
                v-model="hootText"
              />
            </div>
            <div class="row d-flex">
              <button
                class="
                  btn
                  text-start
                  btn-outline-teak
                  border-0
                  py-0
                  px-3
                  w-auto
                  rounded-pill
                "
              >
                <span
                  class="material-icons-outlined fs-6 lh-1 me-1 align-middle"
                >
                  public
                </span>
                <span class="align-middle lh-1">Everyone can reply</span>
              </button>
            </div>
            <hr />
            <div class="row-cols-1 d-flex flex-nowrap justify-content-between">
              <div class="col-7 d-flex">
                <button
                  class="btn col-1 w-34px p-0 border-0 position-relative"
                  v-for="(icon, i) in icons"
                  :key="icon + i"
                >
                  <span
                    class="
                      material-icons-outlined
                      fs-5
                      icons-bg-circle
                      text-teak
                    "
                  >
                    {{ icon }}
                  </span>
                </button>
              </div>
              <div
                class="col-3 d-flex justify-content-between align-items-center"
              >
                <div
                  class="circle-indicator"
                  :class="{ 'circle-lg': characterLeft <= 20 }"
                >
                  <span class="limit-counter" v-if="characterLeft <= 20">{{
                    characterLeft
                  }}</span>
                  <svg
                    height="100%"
                    viewBox="0 0 20 20"
                    width="100%"
                    class="align-baseline"
                  >
                    <circle
                      cx="50%"
                      cy="50%"
                      fill="none"
                      stroke-width="2"
                      r="9"
                      :stroke="characterLeft < 0 ? red : '#EFF3F4'"
                    ></circle>
                    <circle
                      cx="50%"
                      cy="50%"
                      r="9"
                      class="progress"
                      :style="`stroke-dashoffset: ${charaCounter}; stroke-dasharray: 56.5`"
                      :stroke="progressColor"
                    ></circle>
                  </svg>
                </div>
                <div class="divider-sm border mx-2"></div>
                <button
                  class="btn btn-sm p-0 border rounded-circle position-relative"
                >
                  <span class="material-icons-outlined fs-5 lh-1 text-teak">
                    add
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: ["insert_photo", "gif_box", "poll", "schedule", "location_on"],
      hootText: "",
      teak: "#b4846c",
      yellow: "#FFED8F",
      red: "#FF4D4D",
    };
  },
  methods: {
    autoHeight() {
      this.$nextTick(() => {
        this.$refs.textarea.style.height = "auto";
        this.$refs.textarea.style.height =
          this.$refs.textarea.scrollHeight + "px";
      });
    },
  },
  computed: {
    progressColor() {
      const len = 280 - this.hootText.length;
      if (len > 20) {
        return this.teak;
      } else if (len <= 20 && len > 0) {
        return this.yellow;
      } else {
        return this.red;
      }
    },
    characterLeft() {
      return 280 - this.hootText.length;
    },
    charaCounter() {
      return Math.abs(56.5 - (this.hootText.length * 56.5) / 280);
    },
  },
};
</script>

<style scope>
.btn:focus {
  outline: none;
  box-shadow: none;
}
.w-34px {
  width: 34px;
}

.divider-sm {
  width: 1px;
  height: 100%;
}

.circle-lg {
  transform: scale(1.6) rotate(270deg);
  transform-origin: center;
  transition: transform 0.3s;
}
</style>