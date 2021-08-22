<template>
  <div class="display">
    <h2>
      {{ data.config.correct }}o{{ data.config.wrong }}x -
      {{ data.log.length + 1 }}問目
      <span v-show="data.config.end.enable">
        /
        <span v-if="data.log.length + 1 > data.config.end.count">(終了)</span>
        <span v-else>{{ data.config.end.count }}</span>
      </span>
    </h2>
    <div class="topMenu">
      <div>
        <router-link to="/config?type=nomx">設定に戻る</router-link>
      </div>
      <div>
        <button @click="undo()">一つ戻す</button>
      </div>
    </div>
    <div class="players">
      <div
        class="player"
        v-for="(player, index) in data.players"
        :key="player.name"
        :class="{
          win: isNaN(calcOrder(index)),
          lose: player.score.wrong >= data.config.wrong,
        }"
      >
        <div class="playerPosition">
          {{ index + 1 }}
        </div>
        <div class="playerName">
          {{ player.name }}
        </div>
        <div class="playerScore">
          <div class="playerCorrect" @click="correct(index)">
            <div>
              <span>{{ calcOrder(index) }}</span>
            </div>
          </div>
          <div class="playerWrong" @click="wrong(index)">
            <div v-if="player.score.wrong >= data.config.wrong" class="lose">
              <span>LOSE</span>
            </div>
            <div v-if="player.score.wrong < data.config.wrong">
              <span>{{ player.score.wrong }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="log">
      <h3>ログ</h3>
      <div v-if="data.log.length == 0">ここに得点履歴が表示されます。</div>
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
var numeral = require("numeral");
export default {
  name: "nomx",
  data() {
    return { data: this.$store.state.config.format.nomx, order: [] };
  },
  methods: {
    correct(e) {
      store.commit("correct", {
        format: "nomx",
        phase: "nomal",
        type: "correct",
        position: e,
        timestamp: new Date(),
      });
    },
    wrong(e) {
      store.commit("wrong", {
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
      }
    },
    calcOrder(index) {
      const correct = this.data.players[index].score.correct;
      const order =
        this.data.players
          .map((x) => x.score.evaluation)
          .sort((a, b) => b - a)
          .indexOf(this.data.players[index].score.evaluation) + 1;
      if (this.data.config.winThrough.enable) {
        if (this.data.config.end.enable) {
          if (this.data.log.length < this.data.config.end.count) {
            if (correct < this.data.config.correct) {
              return correct;
            } else {
              return numeral(order).format("0o");
            }
          } else {
            if (order <= this.data.config.winThrough.count) {
              return numeral(order).format("0o");
            } else {
              return correct;
            }
          }
        }
      } else {
        if (correct < this.data.config.correct) {
          return correct;
        } else {
          return "WIN";
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h2 {
  background-color: $base-color;
  color: $back-color;
  margin: 0;
  padding: 0.5rem 1rem;
  border-radius: 0 0 2rem 2rem;
  text-align: center;
}
h3 {
  color: $base-color;
  margin: 0;
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
.players {
  display: flex;
  justify-content: space-evenly;
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
    .playerScore {
      div div {
        font-size: 2rem;
        position: relative;
        margin: 1vh auto;
        cursor: pointer;
        color: $back-color;
        height: 10vh;
        width: 10vh;
        border-radius: 50%;
        transition: all ease-in 0.3s;
        user-select: none;
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          -webkit-transform: translateY(-50%) translateX(-50%);
        }
        &:hover {
          opacity: 0.5;
        }
      }
      .playerCorrect div {
        background-color: $correct-color;
      }
      .playerWrong div {
        background-color: $wrong-color;
      }
    }
  }
  .win {
    background-color: $correct-color;
    color: $back-color;
  }
  .lose {
    background-color: $wrong-color;
    color: $back-color;
  }
}
.log {
  margin: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 0.3rem solid $base-color;
  border-radius: 2rem;
}
</style>