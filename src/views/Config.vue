<template>
  <transition mode="out-in">
    <component :is="change"></component>
  </transition>
</template>

<script>
import error from "@/components/error.vue";
import json from "@/components/config/json.vue";
import nomx from "@/components/config/nomx.vue";
export default {
  name: "Config",
  data() {
    return {
      change: "base",
    };
  },
  components: {
    error,
    json,
    nomx,
  },
  created() {
    this.change = this.$route.query.type;
  },
};
</script>

<style lang="scss" scoped>
</style>