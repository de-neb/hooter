<template>
  <div class="bg-teak text-light error" v-if="showError">
    This {{ name }} is just a placeholder.
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    showError: Boolean,
  },
};
</script>

