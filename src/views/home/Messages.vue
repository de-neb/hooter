<template>
  <div class="container">
    <div class="row text-start my-4 px-4 gap-1 flex-column">
      <div class="col p-0">
        <h1 class="fw-bold my-0 mb-2 p-0">Send a message, get a message</h1>
        <h6 class="text-secondary fs-7 mb-4 p-0 m-0">
          Direct Messages are private conversations between you and other people
          on Hooter. Share Tweets, media, and more!
        </h6>
      </div>
      <div class="col p-0">
        <button
          class="btn btn-lg btn-secondary rounded-pill px-4"
          @click="cantDoAction"
        >
          Start a conversation
        </button>
      </div>
    </div>
    <BottomError name="button" :showError="showError" />
  </div>
</template>

<script>
import BottomError from "@/components/BottomError.vue";
export default {
  components: {
    BottomError,
  },
  data() {
    return {
      showError: false,
    };
  },
  methods: {
    cantDoAction() {
      this.showError = true;
      setTimeout(() => (this.showError = false), 2000);
    },
  },
};
</script>

<style>
</style>