<template>
  <div class="form-floating mt-2">
    <input
      :type="isRevealed ? 'text' : 'password'"
      name="inputPassword"
      class="form-control padding-right"
      :class="{ 'is-invalid': !atMinLength }"
      placeholder="Password"
      @input="$emit('update:modelValue', $event.target.value)"
      value=""
      required
    />
    <label for="inputPassword" class="form-label">Password</label>
    <div class="invalid-feedback text-start sub-text">
      Password minimum length is 6 characters
    </div>
    <div class="eye-container" v-if="atMinLength">
      <input
        type="checkbox"
        class="form-check-input mt-0 eye-checkbox"
        v-model="isRevealed"
      />
      <span class="material-icons-outlined eye lh-1" v-if="!isRevealed">
        visibility
      </span>
      <span class="material-icons-outlined eye lh-1" v-else-if="isRevealed">
        visibility_off
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    atMinLength: Boolean,
  },
  data() {
    return {
      isRevealed: false,
    };
  },
};
</script>
