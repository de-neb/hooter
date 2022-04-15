<template>
  <input
    :type="type"
    :name="inputType"
    class="form-control"
    :class="{ 'is-invalid': isInvalid }"
    :placeholder="inputType"
    autofocus=""
    value=""
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <label :for="inputType" class="text-capitalize">{{ inputType }}</label>
  <div class="invalid-feedback text-start sub-text">
    Please enter a valid {{ inputType }}
  </div>
</template>

<script>
export default {
  props: {
    inputType: String,
    isInvalid: Boolean,
    modelValue: String,
  },
  computed: {
    type() {
      if (this.inputType == "email") return this.inputType;
      return "text";
    },
  },
};
</script>
