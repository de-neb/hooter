<template>
  <input
    :type="type"
    :name="inputType"
    class="form-control"
    :class="{
      'is-invalid': isInvalid,
      'username-input': showAtSymbol,
    }"
    :placeholder="inputType"
    autofocus=""
    value=""
    @input="$emit('update:modelValue', $event.target.value)"
    required
  />
  <label :for="inputType" class="text-capitalize">{{ inputType }}</label>
  <template v-if="!isANameInput">
    <div v-if="isExisting" class="invalid-feedback text-start sub-text">
      {{ capitalizedInput }} already exists.
    </div>
    <div
      v-if="!isExisting && !isInvalid && isUsernameInput"
      class="invalid-feedback text-start sub-text"
    >
      Username minimum length is 6 characters
    </div>
    <div
      v-if="isInvalid && !isExisting && !atMinLength"
      class="invalid-feedback text-start sub-text"
    >
      Please enter a valid {{ inputType }}
    </div>
  </template>
</template>

<script>
export default {
  props: {
    inputType: String,
    isInvalid: Boolean,
    modelValue: String,
    isExisting: Boolean,
    showAtSymbol: Boolean,
    atMinLength: Boolean,
  },
  computed: {
    type() {
      if (this.inputType == "email") return this.inputType;
      return "text";
    },
    capitalizedInput() {
      const input = this.inputType;
      return input[0].toUpperCase() + input.slice(1);
    },
    isANameInput() {
      return this.inputType === "Name";
    },
    isUsernameInput() {
      return this.inputType === "username";
    },
  },
};
</script>
