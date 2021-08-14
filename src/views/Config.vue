<template>
  <component :is="change"></component>
</template>

<script>
import error from "@/components/error.vue";
import json from "@/components/config/json.vue";
import nomx from "@/components/config/nomx.vue";
const list = {
  error,
  json,
  nomx,
};
export default {
  name: "Config",
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
.config {
  margin: 1rem;
}
</style>