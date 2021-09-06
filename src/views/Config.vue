<template>
  <div>
    <component :is="change"></component>
  </div>
</template>

<script>
import error from "@/views/Error.vue";
import Count from "@/views/config/Count.vue";
import NoMx from "@/views/config/NoMx.vue";
import NbyN from "@/views/config/NbyN.vue";
import Nupdown from "@/views/config/Nupdown.vue";
import SwedishX from "@/views/config/SwedishX.vue";
import AttackSurvival from "@/views/config/AttackSurvival.vue";
import SquareX from "@/views/config/SquareX.vue";
const list = {
  error,
  Count,
  NoMx,
  NbyN,
  Nupdown,
  SwedishX,
  AttackSurvival,
  SquareX,
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
  h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
    padding-left: 0.5rem;
    color: $base-color;
    border-left: 0.5rem solid $base-color;
  }
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
    justify-content: flex-end;
    gap: 1rem;
    border-top: 3px solid $base-color;
  }
}
</style>