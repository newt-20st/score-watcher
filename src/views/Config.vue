<template>
  <div>
    <component :is="change"></component>
  </div>
</template>

<script>
import error from "@/views/Error.vue";
import count from "@/components/config/count.vue";
import json from "@/components/config/json.vue";
import nomx from "@/components/config/nomx.vue";
import nbyn from "@/components/config/nbyn.vue";
import nupdown from "@/components/config/nupdown.vue";
const list = {
  error,
  json,
  count,
  nomx,
  nbyn,
  nupdown,
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
  h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
    padding-left: 0.5rem;
    color: $base-color;
    border-left: 0.5rem solid $base-color;
  }
  margin: 1rem;
  #jsonConfigOutput {
    min-height: 50vh;
  }
  .menu {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: $back-color;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    border-top: 3px solid $base-color;
  }
}
</style>