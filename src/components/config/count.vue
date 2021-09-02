<template>
  <div class="config">
    <h1>スコア計算</h1>
    <div class="content">
      <form>
        <h2>形式設定</h2>
        <div class="row">
          <div class="form-group col-sm">
            <label>イベント名</label>
            <input class="form-control" v-model="data.name" type="text" />
            <small class="form-text text-muted">画面の右上に表示されます</small>
          </div>
          <div class="form-group col-sm">
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="data.config.minus"
                id="minus"
                type="checkbox"
                checked
              />
              <label class="form-check-label" for="minus">
                マイナスの値を
                <span v-if="data.config.minus">許可する</span
                ><span v-else>許可しない</span>
              </label>
            </div>
          </div>
        </div>
        <h2>参加者設定</h2>
        <div class="form-group">
          <label>プレイヤーの人数</label>
          <select
            class="form-control"
            @input="number($event.target.value)"
            :value="data.players.length"
          >
            <option v-for="i in 20" :key="i">{{ i }}</option>
          </select>
          <small class="form-text text-muted">※最大10人</small>
        </div>
        <div class="playerSetting">
          <div v-for="(player, index) of data.players" :key="index">
            <h3>{{ index + 1 }}人目のプレイヤーデータ</h3>
            <div class="row">
              <div class="form-group col-sm">
                <label>プレイヤーネーム</label>
                <input class="form-control" type="text" v-model="player.name" />
              </div>
              <div class="form-group col-sm">
                <label>初期値</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="player.score.count"
                  :min="data.config.minus ? -9999 : 0"
                />
              </div>
            </div>
          </div>
        </div>
        <h2>問題の読み込み</h2>
        <div class="form-group">
          <label
            >CSV形式で貼り付けてください。1列目が問題、2列目が解答として読み込まれます。</label
          >
          <textarea
            id="quizRaw"
            v-model="quizRaw"
            class="form-control"
            placeholder="quiz data"
          ></textarea>
        </div>
        <div class="menu">
          <router-link class="btn btn-primary" to="/display/?type=count">
            コントロール画面を開く
          </router-link>
          <button class="btn btn-success" type="button" @click="quizUpdate()">
            問題データを更新
          </button>
          <button class="btn btn-success" type="button" @click="configExport()">
            設定ファイルをエクスポート
          </button>
        </div>
        <div class="form-group my-5">
          <label>json config data</label>
          <textarea
            id="jsonConfigOutput"
            :value="JSON.stringify(data)"
            class="form-control"
            placeholder="json config data"
          ></textarea>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from "../../store";
const dialog = require("electron").remote.dialog;
import fs from "fs";
export default {
  name: "ConfigNomx",
  data() {
    return {
      data: this.$store.state.config.format.count,
      base: {},
      quizRaw: this.$store.state.quiz,
    };
  },
  updated() {
    store.commit("update", this.data);
    store.commit("quiz", this.quizRaw);
  },
  methods: {
    number(value) {
      const list = [];
      for (let i = 0; i < value; i++) {
        if (this.data.players[i]) {
          list.push({
            name: this.data.players[i].name,
            score: {
              count: this.data.players[i].score.count,
            },
          });
        } else {
          list.push({
            name: "Player" + String(i + 1),
            score: { count: 0 },
          });
        }
      }
      this.data.players = list;
    },
    configExport() {
      const jsonData = this.$store.state.config.format.count;
      jsonData.version = 0;
      jsonData.exportTimestamp = new Date();
      const options = {
        title: "設定ファイルを保存",
        filters: [{ name: "Documents", extensions: ["json"] }],
      };
      const result = dialog.showSaveDialogSync(options);
      if (result) {
        fs.writeFileSync(
          result,
          JSON.stringify(this.$store.state.config.format.count, null, "\t")
        );
      }
    },
    quizUpdate() {
      const quizRaw = document.getElementById("quizRaw").value.split("\n");
      const dataArray = [];
      for (let i = 0; i < quizRaw.length; i++) {
        dataArray[i] = quizRaw[i].split(",");
      }
      this.data.quiz = dataArray;
    },
  },
};
</script>
<style lang="scss" scoped>
#jsonConfigOutput {
  min-height: 50vh;
}
</style>