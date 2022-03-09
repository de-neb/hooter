<template>
  <div class="container p-0">
    <div class="row m-0 position-relative">
      <img
        src="https://picsum.photos/600/310
"
        alt="trend-banner "
        class="img-fluid p-0"
      />
      <div class="inset-shadow"></div>
      <div class="col p-3 position-absolute bottom-0 text-start">
        <h2 class="text-light fw-bold m-0">Just a placeholder text</h2>
      </div>
    </div>
    <div class="row mx-0 mt-3 px-3 text-start">
      <h3 class="m-0 p-0 fw-bold">Worldwide trends</h3>
      <div
        class="col-12 py-2 px-0"
        v-for="(trend, i) in trends"
        :key="trend._id"
      >
        <span class="text-secondary m-0 sub-text">{{ i + 1 }} · Trending</span>
        <h6 class="fw-bold m-0">{{ trend.trend_name }}</h6>
        <span class="text-secondary m-0 sub-text"
          >{{ convertToReadableNumber(trend.volume) }} Hoots</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getTrends } from "@/services/RequestService.js";
export default {
  data() {
    return {
      trends: [],
    };
  },
  methods: {
    convertToReadableNumber(num) {
      return Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(num);
    },
  },
  async created() {
    this.trends = await getTrends();
  },
};
</script>

<style>
</style>