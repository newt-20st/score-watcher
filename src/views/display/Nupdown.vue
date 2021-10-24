<template>
  <div class="display">
    <div class="header">
      <div class="base">
        <div class="name">
          <h2>{{ data.name }}</h2>
          <div>{{ data.config.n }} updown</div>
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
          <div
            class="quiz"
            v-if="0 < data.log.length && data.log.length <= data.quiz.length"
          >
            <div class="question">
              {{ data.quiz[data.log.length - 1]?.[0] }}
            </div>
            <div class="answer">
              {{ data.quiz[data.log.length - 1]?.[1] }}
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
          win: isNaN(calcScore(index)),
          lose:
            data.config.wrong.enable &&
            player.score.wrong >= data.config.wrong.count,
        }"
      >
        <div class="playerPosition">
          <span v-if="data.display.belong">{{ player.belong }}</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="playerName">
          {{ player.name }}
        </div>
        <div class="playerScore">
          <div class="productScore">{{ calcScore(index) }}</div>
          <div class="eachScore">
            <div class="playerCorrect" @click="correct(index)">
              <span>○</span>
            </div>
            <div class="playerWrong" @click="wrong(index)">
              <span>{{ player.score.wrong }}×</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="log">
      <p v-if="data.log.length == 0">ここに得点履歴が表示されます。</p>
      <ul>
        <li
          class="eachLog"
          :name="index"
          v-for="(eachLog, index) in data.log"
          :key="index"
        >
          <span v-if="eachLog.type === 'correct'">
            {{
              getHMS(eachLog.timestamp) +
              data.players[eachLog.position].name +
              "さんが1点獲得しました。"
            }}
          </span>
          <span v-if="eachLog.type === 'wrong'">
            {{
              getHMS(eachLog.timestamp) +
              data.players[eachLog.position].name +
              "さんが誤答しました。"
            }}
          </span>
          <span v-if="eachLog.type === 'through'">
            {{
              getHMS(eachLog.timestamp) +
              (data.log.length - index) +
              "問目はスルーされました。"
            }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var numeral = require("numeral");
import displayMixin from "../../mixin/display.js";
export default {
  name: "Nupdown",
  data() {
    return {
      data: this.$store.state.config.format.Nupdown,
      order: [],
      timer: "",
    };
  },
  mixins: [displayMixin],
  methods: {
    calcScore(index) {
      const orderList = this.data.players
        .map((x) => x)
        .sort((a, b) => {
          if (a.score.score > b.score.score) return -1;
          if (a.score.score < b.score.score) return 1;
          if (a.score.correct > b.score.correct) return -1;
          if (a.score.correct < b.score.correct) return 1;
          if (a.score.wrong > b.score.wrong) return 1;
          if (a.score.wrong < b.score.wrong) return -1;
          return 0;
        });
      const order = orderList.indexOf(this.data.players[index]) + 1;
      var score = 0;
      for (let eachLog of this.data.log) {
        if (eachLog.position === index && eachLog.type == "correct") {
          score++;
        } else if (eachLog.position === index && eachLog.type == "wrong") {
          break;
        }
      }
      this.data.players[index].score.score = score;
      if (this.data.config.end.enable) {
        if (this.data.log.length < this.data.config.end.count) {
          if (score < this.data.config.n) {
            if (
              this.data.config.wrong.enable &&
              this.data.players[index].score.wrong >=
                this.data.config.wrong.count
            ) {
              return "LOSE";
            } else {
              return score;
            }
          } else {
            return numeral(order).format("0o");
          }
        } else {
          if (order <= this.data.config.n) {
            return numeral(order).format("0o");
          } else {
            return score;
          }
        }
      } else {
        if (score < this.data.config.n) {
          return score;
        } else {
          return numeral(order).format("0o");
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.players {
  .player {
    display: flex;
    flex-direction: column;
    align-items: center;
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
      display: flex;
      flex-direction: column;
      .productScore {
        font-size: 2rem;
        font-weight: 800;
        color: $base-color;
      }
      .eachScore {
        display: flex;
        div {
          border-radius: 50%;
          font-size: 1.5rem;
          position: relative;
          margin: 1vh auto;
          cursor: pointer;
          height: 7vh;
          width: 7vh;
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
        .playerCorrect {
          color: $correct-color;
        }
        .playerWrong {
          color: $wrong-color;
        }
      }
    }
  }
  .win {
    background-color: $correct-color;
    color: $back-color;
    .playerScore {
      .productScore {
        color: $back-color;
      }
      .eachScore {
        .playerCorrect span {
          color: $back-color;
        }
        .playerWrong span {
          color: $back-color;
        }
      }
    }
  }
  .lose {
    background-color: $wrong-color;
    color: $back-color;
    .playerScore {
      .productScore {
        color: $back-color;
      }
      .eachScore {
        .playerCorrect span {
          color: $back-color;
        }
        .playerWrong span {
          color: $back-color;
        }
      }
    }
  }
}
</style>