<template>
  <component :is="change"></component>
</template>

<script>
import error from "@/components/error.vue";
import nomx from "@/components/display/nomx.vue";
const list = {
  error,
  nomx,
};
export default {
  name: "Display",
  data() {
    return {
      change: "base",
    };
  },
  components: list,
  created() {
    if (this.$route.query.type in list) {
      this.change = this.$route.query.type;
    } else {
      this.change = "error";
    }
  },
};
</script>

<style lang="scss">
</style>