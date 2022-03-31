export default {
  data() {
    return {
      errorMessage: "",
      isError: false,
    };
  },
  methods: {
    handleSuccess(response, callback) {
      if (response.code === 200) {
        callback();
      } else throw { error: response.response.data.error };
    },
    handleError(message) {
      this.errorMessage = message;
      this.isError = true;
      setTimeout(() => (this.isError = false), 2000);
    },
  },
};
