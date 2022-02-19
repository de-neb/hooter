<template>
  <div class="position-relative">
    <div class="home-header">
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
            <span
              class="material-icons-outlined text-dark icons-bg-circle fs-5"
            >
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
    </div>
    <div class="filler-sm mb-1"></div>
    <main class="pb-2 d-flex flex-column gap-2">
      <article
        class="container px-3 transition-minimize overflow-hidden"
        :class="{ 'low-opacity': hoot.isMinimized }"
        v-for="(hoot, index) in hoots"
        :key="'hoot-' + index"
        :style="`height: ${
          hoot.isMinimized ? hoot.minimizedHeight : hoot.height
        }px`"
      >
        <HootInput
          @add-another-hoot="
            ({ textLength, minimizedHeight }) =>
              handleHootAddition(textLength, minimizedHeight, index)
          "
          @textarea-focused="
            ({ minimizedH, textAreaH }) =>
              handleTextareaFocus(minimizedH, textAreaH, index)
          "
          :id="'hoot-' + index"
        ></HootInput>
      </article>
    </main>
  </div>
</template>

<script>
import HootInput from "../components/HootInput.vue";
export default {
  components: {
    HootInput,
  },
  data() {
    return {
      hoots: [
        {
          text: "",
          isMinimized: false,
          height: "",
          minimizedHeight: "",
        },
      ],
      isHootInputActive: false,
      hootLength: 0,
      minimizedHeight: "",
    };
  },
  methods: {
    handleHootAddition(textLength, minimizedHeight, index) {
      const lastHootIndex = index;
      this.hootLength = textLength;
      this.isHootInputActive = true;

      //set height and minimized status of last hoot

      this.hoots[lastHootIndex].minimizedHeight = minimizedHeight;
      this.hoots[lastHootIndex].isMinimized = true;
      this.hoots.splice(index + 1, 0, {
        text: "",
        isMinimized: false,
        height: "",
        minimizedHeight: 45,
      });
    },
    handleTextareaFocus(minimizedH, textAreaH, index) {
      this.hoots.forEach((hoot, i) => {
        if (i === index) {
          hoot.isMinimized = false;
          hoot.height = textAreaH + 88;
          hoot.minimizedHeight = minimizedH;
        } else {
          hoot.isMinimized = true;
        }
      });
    },
  },
  computed: {},
};
</script>

<style scope>
</style>