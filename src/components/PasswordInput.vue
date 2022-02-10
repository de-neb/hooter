<template>
  <div class="form-floating mt-2">
    <input
      :type="isRevealed ? 'text' : 'password'"
      name="inputPassword"
      class="form-control padding-right"
      placeholder="Password"
      v-model="password"
      @input="emitPassword"
      required
    />
    <label for="inputPassword" class="form-label">Password</label>
    <div class="eye-container">
      <input
        type="checkbox"
        class="form-check-input mt-0 eye-checkbox"
        v-model="isRevealed"
      />
      <span class="material-icons-outlined eye" v-if="!isRevealed">
        visibility
      </span>
      <span class="material-icons-outlined eye" v-else-if="isRevealed">
        visibility_off
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRevealed: false,
      password: null,
    };
  },
  methods: {
    emitPassword() {
      this.$emit("emit-password", this.password);
    },
  },
};
</script>
