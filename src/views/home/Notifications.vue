<template>
  <div class="row m-0 tab-height">
    <Tabs :tabs="notifTabs" baseUrl="/notifications" />
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
export default {
  components: {
    Tabs,
  },
  data() {
    return {
      notifTabs: [
        {
          name: "All",
          path: "",
          isActive: true,
        },
        {
          name: "Mentions",
          path: "mentions",
          isActive: false,
        },
      ],
    };
  },
};
</script>

<style>
</style>