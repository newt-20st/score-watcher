<template>
  <component :is="change"></component>
</template>

<script>
import error from "@/views/Error.vue";
import count from "@/components/display/count.vue";
import nomx from "@/components/display/nomx.vue";
import nbyn from "@/components/display/nbyn.vue";
import nupdown from "@/components/display/nupdown.vue";
import SwedishX from "@/components/display/SwedishX.vue";
import AttackSurvival from "@/components/display/AttackSurvival.vue";
const list = {
  error,
  count,
  nomx,
  nbyn,
  nupdown,
  SwedishX,
  AttackSurvival,
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
.display {
  h3 {
    color: $base-color;
    margin: 0;
  }
  .header {
    .base {
      border-bottom: 3px solid $base-color;
      display: flex;
      align-items: center;
      gap: 1rem;
      .name {
        display: flex;
        flex-direction: column;
        background-color: $base-color;
        border-radius: 0 3rem 3rem 0;
        min-width: 200px;
        width: 30vw;
        padding: 1rem;
        h2 {
          color: $back-color;
          background-color: $base-color;
          padding: 0;
          margin: 0;
          color: $back-color;
        }
        div {
          color: $back-color;
          opacity: 0.9;
        }
      }
      .info {
        display: flex;
        align-items: center;
        .count {
          white-space: nowrap;
          font-size: 1.5rem;
          padding-right: 1rem;
        }
        .quiz {
          border-left: 3px solid $base-color;
          line-height: 1rem;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.5rem;
          .question {
            max-height: 4rem;
            overflow-y: hidden;
          }
          .answer {
            color: $correct-color;
            max-height: 1rem;
            overflow-y: hidden;
          }
        }
      }
    }
    .menu {
      display: flex;
      justify-content: flex-end;
      padding: 0.5rem;
      gap: 1rem;
      align-items: center;
      .timer {
        .badge {
          cursor: pointer;
        }
      }
    }
  }
  .players {
    display: flex;
    &.default {
      justify-content: space-evenly;
    }
    &.over {
      justify-content: flex-start;
      overflow-x: scroll;
    }
    .player {
      text-align: center;
      padding: 1rem;
      border-radius: 4rem;
      .playerName {
        display: flex;
        font-size: clamp(8vh, 2rem, 8vw);
        font-weight: 800;
        writing-mode: vertical-rl;
        height: 40vh;
      }
    }
  }
  .log {
    margin: 1rem;
    margin-top: 1rem;
    padding: 1rem;
    border: 0.3rem solid $base-color;
    border-radius: 2rem;
  }
}
</style>