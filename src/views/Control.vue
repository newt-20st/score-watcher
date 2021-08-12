<template>
  <component :is="change"></component>
</template>

<script>
import error from "@/components/format/error.vue";
import nomx from "@/components/format/nomx.vue";
export default {
  name: "Control",
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