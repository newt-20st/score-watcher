<template>
  <transition mode="out-in">
    <component :is="change"></component>
  </transition>
</template>

<script>
import error from "@/components/error.vue";
import nomx from "@/components/display/nomx.vue";
export default {
  name: "Display",
  data() {
    return {
      change: "base",
    };
  },
  components: {
    error,
    nomx,
  },
  created() {
    this.change = this.$route.query.type;
  },
};
</script>

<style lang="scss">
</style>