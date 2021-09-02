<template>
  <div class="display">
    <div class="header">
      <div class="base">
        <div class="name">
          <h2>{{ data.name }}</h2>
          <div>{{ data.config.correct }}o{{ data.config.wrong }}x</div>
        </div>
        <div class="info">
          <div class="count">{{ data.log.length }} 問目</div>
          <div class="quiz" v-if="data.quiz[data.log.length]">
            <div class="question">{{ data.quiz[data.log.length]?.[0] }}</div>
            <div class="answer">{{ data.quiz[data.log.length]?.[1] }}</div>
          </div>
        </div>
      </div>
      <div class="menu">
        <div>
          <router-link class="btn btn-sm btn-primary" to="/config?type=count"
            >設定に戻る</router-link
          >
        </div>
        <div>
          <button class="btn btn-sm btn-primary" @click="undo()">
            一つ戻す
          </button>
        </div>
      </div>
    </div>

    <div class="players" :class="getWidth()">
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
        <div class="playerScore">
          <div class="playerCount" @click="count(index)">
            <div>
              <span>{{ player.score.count }}</span>
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
        <div v-if="eachLog.type === 'count'">
          {{
            getHMS(eachLog.timestamp) +
            data.players[eachLog.position].name +
            "さんが1点獲得しました。"
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
    return { data: this.$store.state.config.format.count, order: [] };
  },
  methods: {
    getWidth() {
      return this.data.players.length * 115 > window.innerWidth
        ? "over"
        : "default";
    },
    count(e) {
      store.commit("count", {
        format: "count",
        phase: "nomal",
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
        store.commit("count", {
          format: "count",
          phase: "undo",
          position: action.position,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.players {
  .playerScore {
    div div {
      font-size: 3rem;
      font-weight: 800;
      position: relative;
      margin: 1vh auto;
      cursor: pointer;
      color: $correct-color;
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
  }
}
</style>