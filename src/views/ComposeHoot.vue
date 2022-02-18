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
        v-for="(hoot, index) in hoots"
        :key="index + 'a'"
        :style="`height: ${
          hoot.isMinimized ? hoot.minimizedHeight : hoot.height
        }px`"
      >
        <HootInput
          @add-another-hoot="handleHootAddition"
          @textarea-focused="
            ({ minimizedH, textAreaH }) =>
              handleTextareaFocus(minimizedH, textAreaH, index)
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
    handleHootAddition({ textLength, minimizedHeight }) {
      const lastHootIndex = this.hoots.length - 1;
      this.hootLength = textLength;
      this.isHootInputActive = true;

      //set height and minimized status of last hoot
      this.hoots[lastHootIndex].minimizedHeight = minimizedHeight + 8;
      this.hoots[lastHootIndex].isMinimized = true;
      this.hoots.push({
        text: "",
        isMinimized: false,
        height: "",
        minimizedHeight: "",
      });
    },
    handleTextareaFocus(minimizedH, textAreaH, index) {
      this.hoots.forEach((hoot, i) => {
        if (i === index) {
          hoot.isMinimized = false;
          hoot.height = textAreaH + 88;
        } else {
          hoot.isMinimized = true;
          hoot.minimizedHeight = minimizedH;
        }
      });
      console.log("focus", minimizedH, textAreaH, index);
    },
  },
  computed: {},
};
</script>

<style scope>
</style>