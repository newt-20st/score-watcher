<template>
  <div class="control">
    <h2>
      {{ data.config.correct }}o{{ data.config.wrong }}x -
      {{ data.log.length + 1 }}問目
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
          win: player.score.correct >= data.config.correct,
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
            <div v-if="player.score.correct >= data.config.correct" class="win">
              <span>WIN</span>
            </div>
            <div v-if="player.score.correct < data.config.correct">
              <span> {{ player.score.correct }}</span>
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
    border-radius: 3rem;
  }
  .lose {
    background-color: $wrong-color;
    color: $back-color;
    border-radius: 3rem;
  }
}
.log {
  margin: 0 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 0.3rem solid $base-color;
  border-radius: 2rem;
}
</style>