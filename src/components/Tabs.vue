<template>
  <ul
    class="nav row m-0 p-0 justify-content-between flex-nowrap border-bottom"
    v-if="tabs"
  >
    <li
      class="nav-item h-100 px-3"
      :class="{
        'tab-hover': tab.isActive,
        'col-6': isLengthTwo,
        'col-auto': !isLengthTwo,
      }"
      v-for="(tab, i) in tabs"
      :key="tab + '_' + i"
    >
      <span
        class="h-100 d-inline-flex justify-content-center"
        :class="{ 'active-tab': tab.isActive }"
      >
        <router-link
          class="nav-link active p-0 align-self-center text-secondary"
          :to="{
            path: baseUrl + '/' + tab.path,
          }"
          @click="goToSelectedTab(tab.name)"
          >{{ tab.name }}</router-link
        >
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    baseUrl: String,
    tabs: Array,
  },
  methods: {
    goToSelectedTab(name) {
      this.tabs.forEach((tab) => {
        if (tab.name === name) {
          tab.isActive = true;
        } else {
          tab.isActive = false;
        }
      });
    },
  },
  computed: {
    isLengthTwo() {
      return this.tabs.length === 2;
    },
  },
  watch: {
    "$route.name"(name) {
      this.goToSelectedTab(name);
    },
  },
};
</script>
