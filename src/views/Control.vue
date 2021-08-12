<template>
  <div class="control">
    <h1>7o3x</h1>
    <div class="players">
      <div class="player" v-for="(player, index) in players" :key="player.name">
        <div class="playerPosition">
          {{ index + 1 }}
        </div>
        <div class="playerName">
          {{ player.name }}
        </div>
        <div class="playerScore">
          <div v-if="player.score >= 7">WIN</div>
          <div v-if="player.score < 7">{{ player.score }}</div>
        </div>
        <div class="playerControl">
          <div class="plus" @click="plus(index)">+</div>
          <div class="minus" @click="minus(index)">-</div>
        </div>
      </div>
    </div>
    <div class="log">
      <div
        class="eachLog"
        :name="index"
        v-for="(eachLog, index) in log"
        :key="index"
      >
        <div v-if="eachLog.type === 'plus'">
          {{
            getHMS(eachLog.timestamp) +
            players[eachLog.position].name +
            "さんが1点獲得しました。"
          }}
        </div>
        <div v-if="eachLog.type === 'minus'">
          {{
            getHMS(eachLog.timestamp) +
            players[eachLog.position].name +
            "さんが1点失点しました。"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "Control",
  props: {
    msg: String,
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
  },
  data: function () {
    return {
      log: [],
    };
  },
  methods: {
    plus(e) {
      store.commit("plus", e);
      this.log.unshift({ type: "plus", position: e, timestamp: new Date() });
    },
    minus(e) {
      store.commit("minus", e);
      this.log.unshift({ type: "minus", position: e, timestamp: new Date() });
    },
    getHMS(e) {
      return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds() + " ";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.players {
  display: flex;
  justify-content: space-evenly;
  font-size: clamp(8vh, 2rem, 8vw);
  .player {
    text-align: center;
    .playerName {
      writing-mode: vertical-rl;
      vertical-align: top;
      height: 50vh;
    }
    .playerControl {
      display: flex;
      div {
        cursor: pointer;
        background-color: $color-primary;
      }
    }
  }
}
</style>