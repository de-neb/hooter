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
    <main class="pb-2">
      <article
        class="container px-3 transition-minimize overflow-hidden"
        v-for="(hoot, index) in hootArr"
        :key="index + 'a'"
        :style="`height: ${
          hoot.isMinimized ? hoot.minimizedHeight : hoot.minimumHeight
        }px`"
      >
        <HootInput
          @add-another-hoot="handleHootAddition"
          @textarea-focused="
            (updatedHeight) => handleTextareaFocus(updatedHeight, index)
          "
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
      hootArr: [
        {
          text: "",
          isMinimized: false,
          minimumHeight: "",
          minimizedHeight: "",
        },
      ],
      isHootInputActive: false,
      hootLength: 0,
      minimizedHeight: "",
    };
  },
  methods: {
    handleHootAddition({ textLength, minimizedHeight }) {
      const lastHootIndex = this.hootArr.length - 1;
      this.hootLength = textLength;
      this.isHootInputActive = true;

      //set height and minimized status of last hoot
      this.hootArr[lastHootIndex].minimizedHeight = minimizedHeight + 8;
      this.hootArr[lastHootIndex].isMinimized = true;
      this.hootArr.push({
        text: "",
        isMinimized: false,
        minimumHeight: "",
        minimizedHeight: "",
      });
    },
    handleTextareaFocus(updatedHeight, index) {
      this.hootArr.forEach((hoot, i) => {
        if (i === index) {
          hoot.isMinimized = false;
          hoot.minimizedHeight = updatedHeight + 8;
        } else {
          hoot.isMinimized = true;
        }
      });
      console.log("focus", updatedHeight, index);
    },
  },
  computed: {},
};
</script>

<style scope>
</style>