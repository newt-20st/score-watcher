<template>
  <component :is="change"></component>
</template>

<script>
import error from "@/components/error.vue";
import count from "@/components/display/count.vue";
import nomx from "@/components/display/nomx.vue";
import nbyn from "@/components/display/nbyn.vue";
const list = {
  error,
  count,
  nomx,
  nbyn,
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
        width: 30vw;
        padding: 1rem;
        h2 {
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
        .count {
          font-size: 1.5rem;
          padding: 1rem;
          border-right: 3px solid $base-color;
        }
        .quiz {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .menu {
      display: flex;
      justify-content: flex-end;
      padding: 0.5rem;
      gap: 1rem;
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
        font-size: clamp(8vh, 2rem, 8vw);
        font-weight: 800;
        writing-mode: vertical-rl;
        vertical-align: top;
        height: 40vh;
      }
    }
  }
  .topMenu {
    margin: 0.5rem 1rem;
    display: flex;
    gap: 0.5rem;
    div {
      color: $back-color;
      transition: all ease-in 0.3s;
      a,
      button {
        cursor: pointer;
        display: block;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        border: 1px solid $base-color;
        border-radius: 2rem;
        background-color: $base-color;
        text-decoration: none;
        color: $back-color;
      }
      &:hover {
        opacity: 0.5;
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