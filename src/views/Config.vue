<template>
  <component :is="change"></component>
</template>

<script>
import error from "@/components/error.vue";
import count from "@/components/config/count.vue";
import json from "@/components/config/json.vue";
import nomx from "@/components/config/nomx.vue";
import nbyn from "@/components/config/nbyn.vue";
const list = {
  error,
  json,
  count,
  nomx,
  nbyn,
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
  #jsonConfigOutput {
    min-height: 50vh;
  }
  .menu {
    margin: 1rem;
    display: flex;
    gap: 1rem;
  }
}
</style>