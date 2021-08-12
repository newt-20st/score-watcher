<template>
  <div class="control">
    <h1>{{ data.config.correct }}o{{ data.config.wrong }}x</h1>
    <router-link to="/config?type=nomx">設定に戻る</router-link>
    <button @click="undo()">undo</button>
    <div class="players">
      <div
        class="player"
        v-for="(player, index) in data.players"
        :key="player.name"
      >
        <div class="playerPosition">
          {{ index + 1 }}
        </div>
        <div class="playerName">
          {{ player.name }}
        </div>
        <div class="playerCorrect" @click="correct(index)">
          <div v-if="player.score.correct >= data.config.correct">WIN</div>
          <div v-if="player.score.correct < data.config.correct">
            {{ player.score.correct }}o
          </div>
        </div>
        <div class="playerWrong" @click="wrong(index)">
          <div v-if="player.score.wrong >= data.config.wrong">LOSE</div>
          <div v-if="player.score.wrong < data.config.wrong">
            {{ player.score.wrong }}x
          </div>
        </div>
      </div>
    </div>
    {{ this.$store.state.config.format.nomx }}
    <div class="log">
      <div
        class="eachLog"
        :name="index"
        v-for="(eachLog, index) in data.log"
        :key="index"
      >
        <div v-if="eachLog.type === 'correct'">
          {{
            getHMS(eachLog.timestamp) +
            data.players[eachLog.position].name +
            "さんが1点獲得しました。"
          }}
        </div>
        <div v-if="eachLog.type === 'wrong'">
          {{
            getHMS(eachLog.timestamp) +
            data.players[eachLog.position].name +
            "さんが1点失点しました。"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
export default {
  name: "nomx",
  data() {
    return { data: this.$store.state.config.format.nomx };
  },
  methods: {
    correct(e) {
      store.commit("correct", { format: "nomx", phase: "nomal", position: e });
      store.commit("log", {
        format: "nomx",
        phase: "nomal",
        type: "correct",
        position: e,
        timestamp: new Date(),
      });
    },
    wrong(e) {
      store.commit("wrong", { format: "nomx", phase: "nomal", position: e });
      store.commit("log", {
        format: "nomx",
        phase: "nomal",
        type: "wrong",
        position: e,
        timestamp: new Date(),
      });
    },
    getHMS(e) {
      return e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds() + " ";
    },
    undo() {
      if (this.data.log.length > 0) {
        const action = this.data.log[0];
        if (action.type == "correct") {
          store.commit("correct", {
            format: "nomx",
            phase: "undo",
            position: action.position,
          });
        } else if (action.type == "wrong") {
          store.commit("wrong", {
            format: "nomx",
            phase: "undo",
            position: action.position,
          });
        }
        store.commit("log", {
          format: "nomx",
          phase: "undo",
          long: -1,
        });
      }
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
    .playerCorrect,
    .playerWrong {
      display: flex;
      div {
        cursor: pointer;
        background-color: $base-color;
      }
    }
  }
}
</style>