<template>
  <div class="low-opacity-backdrop">
    <ConfirmationModal></ConfirmationModal>
  </div>
</template>

<script>
import ConfirmationModal from "@/components/ConfirmationModal.vue";
export default {
  components: {
    ConfirmationModal,
  },
};
</script>
