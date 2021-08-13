<template>
  <div class="config">
    <h1>NoMx</h1>
    <form>
      <h2>形式設定</h2>
      <div class="form-group">
        <label>勝ち抜け正解数</label>
        <input
          class="form-control"
          v-model="data.config.correct"
          type="number"
          min="0"
        />
        <small class="form-text text-muted"
          >勝ち抜けまでに必要な正解数を設定してください</small
        >
      </div>
      <div class="form-group">
        <label>失格誤答数</label>
        <input
          class="form-control"
          v-model="data.config.wrong"
          type="number"
          min="0"
        />
        <small class="form-text text-muted"
          >失格に必要な誤答数を設定してください</small
        >
      </div>
      <h2>参加者設定</h2>
      <div class="form-group">
        <label>プレイヤーの人数</label>
        <select
          class="form-control"
          @input="number($event.target.value)"
          :value="data.players.length"
        >
          <option v-for="i in 10" :key="i">{{ i }}</option>
        </select>
        <small class="form-text text-muted">※最大10人</small>
      </div>
      <div class="playerSetting">
        <div v-for="(player, index) of data.players" :key="index">
          <h3>{{ index + 1 }}人目のプレイヤーデータ</h3>
          <div class="form-group">
            <label>プレイヤーネーム</label>
            <input class="form-control" type="text" v-model="player.name" />
          </div>
          <div class="form-group">
            <label>正解数</label>
            <input
              class="form-control"
              type="text"
              v-model="player.score.correct"
            />
          </div>
          <div class="form-group">
            <label>誤答数</label>
            <input
              class="form-control"
              type="text"
              v-model="player.score.wrong"
            />
          </div>
        </div>
      </div>
      <router-link class="btn btn-primary" to="/display/?type=nomx">
        コントロール画面を開く
      </router-link>
      <button class="btn btn-success" @click="configExport()">
        設定ファイルをエクスポート
      </button>
      <div class="form-group my-5">
        <label>json config data</label>
        <textarea
          :value="JSON.stringify(data)"
          class="form-control"
          placeholder="json config data"
        ></textarea>
      </div>
    </form>
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
      data: this.$store.state.config.format.nomx,
      base: {},
    };
  },
  updated() {
    store.commit("update", this.data);
  },
  methods: {
    number(value) {
      const list = [];
      for (let i = 0; i < value; i++) {
        if (this.data.players[i]) {
          list.push({
            name: this.data.players[i].name,
            score: {
              correct: this.data.players[i].score.correct,
              wrong: this.data.players[i].score.wrong,
            },
          });
        } else {
          list.push({
            name: "Player" + String(i + 1),
            score: { correct: 0, wrong: 0 },
          });
        }
      }
      this.data.players = list;
    },
    configExport() {
      const jsonData = this.$store.state.config.format.nomx;
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
          JSON.stringify(this.$store.state.config.format.nomx, null, "\t")
        );
      }
    },
  },
};
</script>
