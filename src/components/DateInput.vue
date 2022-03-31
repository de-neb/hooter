<template>
  <div class="input-group gap-3 flex-nowrap">
    <!-- date month -->
    <div class="form-floating my-2 flex-grow-1">
      <select
        class="form-select"
        id="month-selector"
        v-model="monthModel"
        @change="setMonthShortName($event)"
      >
        <option v-for="(month, i) in months" :key="month" :value="++i">
          {{ month }}
        </option>
      </select>
      <label for="month-selector">Month</label>
    </div>

    <!-- date day -->
    <div class="form-floating my-2 flex-grow-1">
      <select class="form-select" id="day-selector" v-model="dayModel">
        <option v-for="day in days" :key="month + '-' + day" :value="day">
          {{ day }}
        </option>
      </select>
      <label for="day-selector">Day</label>
    </div>

    <!-- date year -->
    <div class="form-floating my-2 flex-grow-1">
      <select class="form-select" id="year-selector" v-model="yearModel">
        <option
          v-for="year in birthYears"
          :key="month + '-' + year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
      <label for="year-selector">Year</label>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      minimumYear: 1902,
    };
  },
  methods: {
    setMonthShortName(e) {
      this.SET_SHORT_MONTH(this.getMonthName("short")[e.target.value - 1]);
    },
    ...mapMutations("date", [
      "SET_DAY",
      "SET_MONTH",
      "SET_YEAR",
      "SET_SHORT_MONTH",
    ]),
  },
  computed: {
    ...mapState("date", ["day", "month", "year", "monthShortName"]),
    ...mapGetters("date", ["getMonthName"]),
    dayModel: {
      get() {
        return this.day;
      },
      set(value) {
        this.SET_DAY(value);
      },
    },
    monthModel: {
      get() {
        return this.month;
      },
      set(value) {
        this.SET_MONTH(value);
      },
    },
    yearModel: {
      get() {
        return this.year;
      },
      set(value) {
        this.SET_YEAR(value);
      },
    },
    months() {
      return this.getMonthName("long");
    },
    days() {
      const days = new Date(2000, this.monthModel, 0).getDate();
      return Array.from(Array(days), (e, i) => ++i);
    },
    currentYear() {
      return new Date().getFullYear();
    },
    birthYearRange() {
      return this.currentYear - this.minimumYear;
    },
    allBirthYears() {
      return Array.from(
        Array(this.birthYearRange),
        (e, i) => this.minimumYear + i
      ).reverse();
    },
    leapYears() {
      return this.allBirthYears.filter(
        (year) => (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
      );
    },
    birthYears() {
      if (this.monthModel === 2 && this.dayModel === 29) return this.leapYears;
      return this.allBirthYears;
    },
    wholeDate() {
      return this.dayModel && this.monthModel && this.yearModel;
    },
  },
};
</script>
