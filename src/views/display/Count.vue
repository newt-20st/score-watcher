<template>
  <div class="display">
    <div class="header">
      <div class="base">
        <div class="name">
          <h2>{{ data.name }}</h2>
          <div>{{ data.type }}</div>
        </div>
        <div class="info">
          <div class="count">Q{{ data.log.length + 1 }}</div>
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
      >
        <div class="playerPosition">
          <span v-if="data.display.belong">{{ player.belong }}</span>
          <span v-else>{{ index + 1 }}</span>
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
        <div v-if="eachLog.type === 'correct'">
          {{
            getHMS(eachLog.timestamp) +
            data.players[eachLog.position].name +
            "さんが1点獲得しました。"
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
import displayMixin from "../../mixin/display.js";
export default {
  name: "Count",
  data() {
    return {
      data: this.$store.state.config.format.Count,
      order: [],
    };
  },
  mixins: [displayMixin],
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