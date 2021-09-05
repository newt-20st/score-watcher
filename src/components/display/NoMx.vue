<template>
  <div class="display">
    <div class="header">
      <div class="base">
        <div class="name">
          <h2>{{ data.name }}</h2>
          <div>{{ data.config.correct }}o{{ data.config.wrong }}x</div>
        </div>
        <div class="info">
          <div class="count">
            Q{{ data.log.length + 1 }}
            <span v-show="data.config.end.enable">
              /
              <span v-if="data.log.length + 1 > data.config.end.count"
                >(終了)</span
              >
              <span v-else>{{ data.config.end.count }}</span>
            </span>
          </div>
          <div class="quiz" v-if="data.quiz[data.log.length]">
            <div class="quiz" v-if="data.quiz[data.log.length]">
              <div class="question">
                {{ data.quiz[data.log.length - 1]?.[0] }}
              </div>
              <div class="answer">
                {{ data.quiz[data.log.length - 1]?.[1] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Menu :format="data.type" @undo="undo()" @through="through()" />
    </div>
    <div class="players" :class="getWidth()">
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
            "さんが正解しました。"
          }}
        </div>
        <div v-if="eachLog.type === 'wrong'">
          {{
            getHMS(eachLog.timestamp) +
            data.players[eachLog.position].name +
            "さんが誤答しました。"
          }}
        </div>
        <div v-if="eachLog.type === 'through'">
          {{
            getHMS(eachLog.timestamp) +
            (data.log.length - index) +
            "問目はスルーされました。"
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import displayMixin from "../../mixin/display.js";
export default {
  name: "NoMx",
  data() {
    return {
      data: this.$store.state.config.format.NoMx,
      order: [],
      timer: "",
    };
  },
  mixins: [displayMixin],
  methods: {
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