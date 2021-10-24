<template>
  <div class="config">
    <h1>スコア計算</h1>
    <div class="content">
      <form>
        <div class="formNotice">
          ※
          <span class="badge badge-danger">必須</span>
          ：必ず設定の確認が必要と思われる項目です
        </div>
        <h2>形式設定</h2>
        <div class="row">
          <div class="form-group col-sm-4">
            <label>イベント名</label>
            <input class="form-control" v-model="data.name" type="text" />
            <small class="form-text text-muted">画面の右上に表示されます</small>
          </div>
          <div class="form-group col-sm-4">
            <label
              >プレイヤーの人数
              <span class="badge badge-danger">必須</span></label
            >
            <select
              class="form-control"
              @input="number($event.target.value)"
              :value="data.players.length"
            >
              <option v-for="i in 15" :key="i">{{ i }}</option>
            </select>
            <small class="form-text text-muted">※最大15人</small>
          </div>
        </div>
        <h2>表示設定</h2>
        <div class="row">
          <div class="form-group col-sm-4">
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="data.display.belong"
                id="belongEnable"
                type="checkbox"
                checked
              />
              <label class="form-check-label" for="belongEnable">
                名前の上に所属を
                <span v-if="data.display.belong">表示する</span
                ><span v-else>表示しない</span>
              </label>
              <small class="form-text text-muted"></small>
            </div>
          </div>
        </div>
        <TimerConfig
          :timer="data.display.timer"
          @enable="data.display.timer.enable = $event"
          @countdown="data.display.timer.countdown = $event"
          @start="data.display.timer.start = $event"
        />
        <h2>参加者設定</h2>
        <div class="playerSetting">
          <div v-for="(player, index) of data.players" :key="index">
            <h3>{{ index + 1 }}人目のプレイヤーデータ</h3>
            <div class="row">
              <div class="form-group col-sm-4">
                <label>プレイヤーネーム</label>
                <input class="form-control" type="text" v-model="player.name" />
              </div>
              <div v-show="data.display.belong" class="form-group col-sm-4">
                <label>所属</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="player.belong"
                />
              </div>
              <div class="form-group col-sm-4">
                <label>初期値</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="player.score.correct"
                  :min="data.config.minus ? -9999 : 0"
                />
              </div>
            </div>
          </div>
        </div>
        <QuizLoad @quiz-update="data.quiz = $event" />
        <JsonOutput :data="data" />
        <Menu :format="data.type" />
      </form>
    </div>
  </div>
</template>

<script>
import configMenu from "../../mixin/config.js";
export default {
  name: "Count",
  data() {
    return {
      data: this.$store.state.config.format.Count,
      base: {},
    };
  },
  mixins: [configMenu],
  methods: {
    number(value) {
      const list = [];
      for (let i = 0; i < value; i++) {
        if (this.data.players[i]) {
          list.push({
            name: this.data.players[i].name,
            belong: this.data.players[i].belong,
            score: {
              correct: this.data.players[i].score.correct,
              evaluation: this.data.players[i].score.evaluation,
            },
          });
        } else {
          list.push({
            name: "Player" + String(i + 1),
            belong: "",
            score: { correct: 0, evaluation: 0 },
          });
        }
      }
      this.data.players = list;
    },
  },
};
</script>
<style lang="scss" scoped>
#jsonConfigOutput {
  min-height: 50vh;
}
</style>