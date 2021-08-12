<template>
  <component :is="change"></component>
</template>

<script>
import error from "@/components/config/error.vue";
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
    nomx,
  },
  created() {
    this.change = this.$route.query.type;
  },
};
</script>

<style lang="scss" scoped>
</style>