<template>
  <div class="position-relative">
    <TopNav>
      <template #action-button>
        <button
          class="
            btn btn-secondary
            rounded-pill
            fw-bold
            text-light
            px-3
            py-1
            text-nowrap
          "
        >
          {{ hoots.length > 1 ? "Hoot all" : "Hoot" }}
        </button>
      </template>
    </TopNav>

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
          :hootsLength="hoots.length"
        ></HootInput>
      </article>
    </main>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import HootInput from "../components/HootInput.vue";
import TopNav from "../components/TopNav.vue";
export default {
  components: {
    HootInput,
    TopNav,
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
          if (index != 0) {
            hoots[index - 1].isMinimized = false;
          } else {
            hoots[1].isMinimized = false;
          }
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