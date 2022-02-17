<template>
  <div class="container home-header">
    <nav class="row h-100 justify-content-between m-0 px-3 py-0">
      <div
        class="
          col-2
          p-0
          d-flex
          align-items-center
          justify-content-start
          h-100
          position-relative
        "
      >
        <router-link to="#" class="position-relative">
          <span class="material-icons-outlined text-dark icons-bg-circle fs-5">
            arrow_back
          </span>
        </router-link>
      </div>

      <div
        class="col-3 p-0 d-flex justify-content-end align-items-center h-100"
      >
        <button
          class="btn btn-secondary rounded-pill fw-bold text-light px-3 py-1"
        >
          Hoot
        </button>
      </div>
    </nav>
    <main>
      <article class="container px-3">
        <HootInput></HootInput>
      </article>
    </main>
  </div>
</template>

<script>
import HootInput from "../components/HootInput.vue";
export default {
  components: {
    HootInput,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scope>
</style>