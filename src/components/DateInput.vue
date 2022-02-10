<template>
  <div class="input-group gap-3 flex-nowrap">
    <!-- date month -->
    <div class="form-floating my-2 flex-grow-1">
      <select
        class="form-select"
        id="month-selector"
        v-model="month"
        @change="setMonthShortName($event)"
      >
        <option v-for="(month, i) in monthsArr" :key="month" :value="++i">
          {{ month }}
        </option>
      </select>
      <label for="month-selector">Month</label>
    </div>

    <!-- date day -->
    <div class="form-floating my-2 flex-grow-1">
      <select class="form-select" id="day-selector" v-model="day">
        <option v-for="day in daysArr" :key="month + '-' + day" :value="day">
          {{ day }}
        </option>
      </select>
      <label for="day-selector">Day</label>
    </div>

    <!-- date year -->
    <div class="form-floating my-2 flex-grow-1">
      <select class="form-select" id="year-selector" v-model="year">
        <option v-for="year in yearArr" :key="month + '-' + year" :value="year">
          {{ year }}
        </option>
      </select>
      <label for="year-selector">Year</label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getMonth(format) {
      return Array.from(Array(12), (e, i) => {
        return new Date(25e8 * ++i).toLocaleString("en-US", { month: format });
      });
    },
    setMonthShortName(e) {
      this.$store.commit(
        "setMonthShortName",
        this.getMonth("short")[e.target.value - 1]
      );
    },
  },
  computed: {
    day: {
      get() {
        return this.$store.state.day;
      },
      set(value) {
        this.$store.commit("updateDay", value);
      },
    },
    month: {
      get() {
        return this.$store.state.month;
      },
      set(value) {
        this.$store.commit("updateMonth", value);
      },
    },
    year: {
      get() {
        return this.$store.state.year;
      },
      set(value) {
        this.$store.commit("updateYear", value);
      },
    },
    monthsArr() {
      return this.getMonth("long");
    },
    daysArr() {
      const days = new Date(2000, this.month, 0).getDate();
      return Array.from(Array(days), (e, i) => ++i);
    },
    yearArr() {
      const currentYear = new Date().getFullYear();
      const yearRange = currentYear - 1902;
      const resultArr = Array.from(
        Array(yearRange),
        (e, i) => 1902 + i
      ).reverse();

      if (this.month === 2 && this.day === 29) {
        return resultArr.filter(
          (year) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
        );
      }
      return resultArr;
    },
    wholeDate() {
      return this.day && this.month && this.year;
    },
  },
};
</script>

<style>
</style>