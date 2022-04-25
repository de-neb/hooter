<template>
  <input
    :type="type"
    :name="inputType"
    class="form-control"
    :class="{
      'is-invalid': isInvalid || isExisting,
      'username-input': showAtSymbol,
    }"
    :placeholder="inputType"
    autofocus=""
    value=""
    @input="$emit('update:modelValue', $event.target.value)"
    required
  />
  <label :for="inputType" class="text-capitalize">{{ inputType }}</label>
  <div v-if="!isExisting" class="invalid-feedback text-start sub-text">
    Please enter a valid {{ inputType }}
  </div>
  <div v-if="isExisting" class="invalid-feedback text-start sub-text">
    {{ capitalizedInput }} already exists.
  </div>
</template>

<script>
export default {
  props: {
    inputType: String,
    isInvalid: Boolean,
    modelValue: String,
    isExisting: Boolean,
    showAtSymbol: Boolean,
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
  },
};
</script>
