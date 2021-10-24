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
      <Menu
        :format="data.type"
        :display="data.display"
        @undo="undo()"
        @through="through()"
      />
    </div>
    <div class="players" :class="getWidth()">
      <div
        class="player"
        v-for="(player, index) in data.players"
        :key="player.name"
        :class="{
          win: isNaN(calcOrder(index)) && calcOrder(index) !== 'LOSE',
          lose: player.score.wrong >= data.config.n,
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
          <div class="productScore">{{ calcOrder(index) }}</div>
          <div class="eachScore">
            <div class="playerCorrect" @click="correct(index)">
              <span>{{ player.score.correct }}</span>
            </div>
            <div class="playerWrong" @click="wrong(index)">
              <span>{{ data.config.n - player.score.wrong }}</span>
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
              "さんが正解しました。"
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
  name: "NbyN",
  data() {
    return {
      data: this.$store.state.config.format.NbyN,
      order: [],
      timer: "",
    };
  },
  mixins: [displayMixin],
  methods: {
    winJudge(index) {
      const score =
        this.data.players[index].score.correct *
        (this.data.config.n - this.data.players[index].score.wrong);
      return score >= this.data.config.n ** 2;
    },
    calcOrder(index) {
      const score =
        this.data.players[index].score.correct *
        (this.data.config.n - this.data.players[index].score.wrong);
      const order =
        this.data.players
          .map((x) => x.score.evaluation)
          .sort((a, b) => b - a)
          .indexOf(this.data.players[index].score.evaluation) + 1;
      if (this.data.config.end.enable) {
        if (this.data.log.length < this.data.config.end.count) {
          if (score < this.data.config.n ** 2) {
            if (this.data.players[index].score.wrong >= this.data.config.n) {
              return "LOSE";
            } else {
              return score;
            }
          } else {
            return numeral(order).format("0o");
          }
        } else {
          if (order <= this.data.config.winThrough.count) {
            return numeral(order).format("0o");
          } else {
            return score;
          }
        }
      } else {
        if (score < this.data.config.n ** 2) {
          if (this.data.players[index].score.wrong >= this.data.config.n) {
            return "LOSE";
          } else {
            return score;
          }
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
  display: flex;
  justify-content: space-evenly;
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
          background-color: $back-color;
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
    }
  }
  .lose {
    background-color: $wrong-color;
    color: $back-color;
    .playerScore {
      .productScore {
        color: $back-color;
      }
    }
  }
}
</style>