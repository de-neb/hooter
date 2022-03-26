<template>
  <div class="bg-teak text-light error" v-if="showError">
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    showError: Boolean,
    errorText: String,
  },
  computed: {
    content() {
      if (this.errorText) {
        return this.errorText;
      } else {
        return `This ${this.name} is just a placeholder.`;
      }
    },
  },
};
</script>

