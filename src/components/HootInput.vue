<template>
  <div class="row justify-content-between m-0 px-0">
    <div class="col-2 pe-2 ps-0">
      <div
        class="profile-icon-lg mb-1"
        :style="{ 'background-color': '#' + imgBg }"
      >
        <h3 class="uname-first-letter text-light">
          {{ firstName[0].toUpperCase() }}
        </h3>
      </div>
      <div class="vertical-line" v-if="isMultipleHoot"></div>
    </div>
    <div class="col-10 p-0 position-relative">
      <div class="row-cols-1 d-flex flex-nowrap">
        <div class="col-11 d-flex" :class="{ 'col-12': !isCloseBtnShown }">
          <textarea
            type="text"
            class="compose-input-text w-100 fs-5"
            :placeholder="placeholder"
            @input="autoHeight('textarea-' + id)"
            @click="handleHeightAdjust('textarea-focused')"
            :ref="'textarea-' + id"
            max-length="textAreaCharLimit"
            v-model="hootText"
            v-focus
          />
        </div>
        <div class="col-1 p-0" v-if="isCloseBtnShown">
          <button
            class="btn btn-sm p-0 rounded-circle center-item"
            @click="$emit('delete-hoot')"
          >
            <span class="material-icons-outlined fs-6 lh-1 text-teak">
              close
            </span>
          </button>
        </div>
      </div>
      <div class="row d-flex" v-if="!isStatusReply">
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
          <span class="material-icons-outlined fs-6 lh-1 me-1 align-middle">
            public
          </span>
          <span class="align-middle lh-1">Everyone can reply</span>
        </button>
      </div>
      <hr v-if="!isStatusReply" />
      <div class="row-cols-1 d-flex flex-nowrap justify-content-between">
        <div class="col-7 d-flex">
          <button
            class="btn col-1 w-34px p-0 border-0 position-relative"
            v-for="(icon, i) in icons"
            :key="icon + i"
          >
            <span
              class="material-icons-outlined fs-5 icons-bg-circle text-teak"
            >
              {{ icon }}
            </span>
          </button>
        </div>
        <div
          class="d-flex justify-content-between align-items-center"
          :class="{
            'col-5': isStatusReply,
            'col-3': !isStatusReply,
            'floating-reply-btn': !isFocused && isStatusReply,
          }"
        >
          <div
            class="circle-indicator"
            :class="{ 'circle-lg': charLeft <= 20 }"
            v-if="hootText"
          >
            <span
              class="limit-counter"
              :class="charLeft <= 0 ? 'text-danger' : 'text-dark'"
              v-if="charLeft <= 20"
              >{{ charLeft }}</span
            >
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
                :stroke="charLeft < 0 ? red : '#EFF3F4'"
              ></circle>
              <circle
                cx="50%"
                cy="50%"
                r="9"
                class="progress"
                :style="`stroke-dashoffset: ${charCounter}; stroke-dasharray: 56.5`"
                :stroke="progressColor"
              ></circle>
            </svg>
          </div>
          <button
            v-if="isStatusReply"
            @click="replyToHoot"
            class="
              btn btn-secondary
              rounded-pill
              fw-bold
              text-light
              px-3
              py-1
              text-nowrap
              ms-auto
            "
          >
            Reply
          </button>
          <div
            class="col d-flex flex-row justify-content-center"
            v-if="!isStatusReply && hootText"
          >
            <div class="divider-sm border mx-2"></div>
            <button
              class="btn btn-sm p-0 border rounded-circle center-item"
              @click="addAnotherHoot"
            >
              <span class="material-icons-outlined fs-6 lh-1 text-teak">
                add
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    isMultipleHoot: Boolean,
    areCloseConditionsMet: Boolean,
    hootsLength: Number,
    isStatusReply: Boolean,
  },
  data() {
    return {
      hootText: "",
      teak: "#b4846c",
      yellow: "#FFED8F",
      red: "#FF4D4D",
      minimizedHeight: "",
      textAreaHeight: 114,
      textAreaCharLimit: 280,
      isFocused: false,
    };
  },
  methods: {
    autoHeight(refName) {
      this.$nextTick(() => {
        this.$refs[refName].style.height = "114px";
        this.$refs[refName].style.height =
          this.$refs[refName].scrollHeight + "px";
        this.textAreaHeight = this.$refs[refName].scrollHeight;
      });
      this.handleHeightAdjust();
    },
    addAnotherHoot() {
      this.$emit("add-another-hoot", {
        textLength: this.hootTextLength,
        minimizedHeight: this.minimizedHeight,
      });
    },
    heightTrack(textLength) {
      if (textLength === 0) {
        this.minimizedHeight = 50;
      } else
        for (let i = 0; i < textLength; i++) {
          if (textLength < this.charLengths[i]) {
            this.minimizedHeight = this.textAreaSizes[i];
            return;
          }
        }
    },
    handleHeightAdjust(eventName) {
      if (this.hootText.length === 0) {
        this.minimizedHeight = 50;
      }
      this.$emit(eventName, {
        minimizedH: this.minimizedHeight,
        textAreaH: this.textAreaHeight,
      });
      this.isFocused = true;
    },
    emitTextAreaValue(e) {
      this.$emit("update:hootText", e.target.value);
    },
    replyToHoot() {
      console.log("working");
      this.$emit("post-reply-hoot", this.hootText);
    },
  },
  computed: {
    progressColor() {
      const len = this.textAreaCharLimit - this.hootText.length;
      const cutoff = 20;
      if (len > cutoff) {
        return this.teak;
      } else if (len <= cutoff && len > 0) {
        return this.yellow;
      } else {
        return this.red;
      }
    },
    charLeft() {
      return this.textAreaCharLimit - this.hootText.length;
    },
    charCounter() {
      const circumference = 56.5;
      return Math.abs(
        circumference -
          (this.hootText.length * circumference) / this.textAreaCharLimit
      );
    },
    charLengths() {
      return Array.from(Array(this.textAreaCharLimit), (e, i) => ++i).filter(
        (e) => e % 29 == 0
      );
    },
    textAreaSizes() {
      const result = [];
      for (let i = 50; i < 252; i = i + 25) {
        result.push(i);
      }
      return result;
    },
    isCloseBtnShown() {
      return this.areCloseConditionsMet && this.hootText.length === 0;
    },
    placeholder() {
      if (this.isStatusReply) return "Hoot your reply";
      else
        return this.hootsLength > 1 ? "Add another Hoot" : "What's happening?";
    },
    icons() {
      if (this.isStatusReply) return ["insert_photo", "gif_box", "location_on"];
      else
        return ["insert_photo", "gif_box", "poll", "schedule", "location_on"];
    },
    imgBg() {
      return this.$store.state.user.userObj.avatar.img_bg;
    },
    firstName() {
      return this.$store.state.user.userObj.first_name;
    },
  },
  watch: {
    hootText(newVal) {
      this.heightTrack(newVal.length);
      this.handleHeightAdjust("textarea-focused");
    },
  },
  directives: {
    focus: {
      mounted: function (el) {
        el.focus();
      },
    },
  },
};
</script>

<style scoped>
.btn:focus {
  outline: none;
  box-shadow: none;
}
.w-34px {
  width: 34px;
}

.divider-sm {
  width: 1px;
  height: inherit;
}

.circle-lg {
  transform: scale(1.6) rotate(270deg);
  transform-origin: center;
  transition: transform 0.3s;
}

.floating-reply-btn {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  width: auto;
  opacity: 0.6;
}
</style>