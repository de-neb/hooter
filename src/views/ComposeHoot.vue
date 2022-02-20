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
        :key="hoot.id"
        :style="`height: ${
          hoot.isMinimized ? hoot.minimizedHeight : hoot.height
        }px`"
        :ref="'hoot-' + hoot.id"
      >
        <HootInput
          @add-another-hoot="
            ({ minimizedHeight }) => addHoot(minimizedHeight, hoot.id, index)
          "
          @textarea-focused="
            ({ minimizedH, textAreaH }) =>
              handleTextareaFocus(minimizedH, textAreaH, hoot.id)
          "
          @delete-hoot="deleteHoot(hoot.id)"
          :id="hoot.id"
          :isMultipleHoot="isMultipleHoot(index, hoots.length - 1)"
          :areCloseConditionsMet="closeBtnConditions(index, hoot.isMinimized)"
        ></HootInput>
      </article>
    </main>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
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
          id: uuid(),
        },
      ],
      isHootInputActive: false,
      hootLength: 0,
      minimizedHeight: "",
    };
  },
  methods: {
    addHoot(minimizedHeight, id, index) {
      //set height and minimized status of last hoot
      this.hoots.forEach((hoot) => {
        if (hoot.id === id) {
          hoot.minimizedHeight = minimizedHeight;
          hoot.isMinimized = true;
        }
      });
      this.hoots.splice(index + 1, 0, {
        text: "",
        isMinimized: false,
        height: "",
        minimizedHeight: 45,
        id: uuid(),
      });
    },
    deleteHoot(id) {
      this.hoots.forEach((hoot, index, hoots) => {
        if (hoot.id === id) {
          hoots[index - 1].isMinimized = false;
          hoots.splice(index, 1);
        }
      });
    },
    handleTextareaFocus(minimizedH, textAreaH, id) {
      this.hoots.forEach((hoot) => {
        if (hoot.id === id) {
          hoot.isMinimized = false;
          hoot.height = textAreaH + 88;
          hoot.minimizedHeight = minimizedH;
        } else {
          hoot.isMinimized = true;
        }
      });
    },
    isMultipleHoot(index, lastIndex) {
      if (index >= 0 && index != lastIndex) return true;
      else return false;
    },
    closeBtnConditions(index, isMinimized) {
      return this.hoots.length > 1 && index >= 0 && !isMinimized;
    },
  },
};
</script>

<style scope>
</style>