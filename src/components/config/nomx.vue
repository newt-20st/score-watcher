<template>
  <div class="home">
    <h1>nomx</h1>
    <h2>形式設定</h2>
    <h3>勝ち抜け正解数</h3>
    <input v-model="data.config.correct" type="number" min="0" />
    <h3>失格誤答数</h3>
    <input v-model="data.config.wrong" type="number" min="0" />
    <h2>参加者設定</h2>
    <h3>プレイヤーの人数</h3>
    ※最大10人
    <input
      :value="data.players.length"
      @input="number($event.target.value)"
      min="1"
      max="10"
      type="number"
    />
    <h3>各プレイヤーの設定</h3>
    <div class="playerSetting">
      <div v-for="(player, index) of data.players" :key="index">
        <h4>{{ index + 1 }}人目のプレイヤーデータ</h4>
        プレイヤーネーム：<input type="text" v-model="player.name" /><br />
        正解数：<input type="number" v-model="player.score.correct" /><br />
        誤答数：<input type="number" v-model="player.score.wrong" />
      </div>
    </div>
    <router-link to="/display/?type=nomx"> コントロール画面を開く </router-link>
    <button @click="configExport()">設定ファイルをエクスポート</button>
    <p>{{ this.data }}</p>
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
      if (this.data.players.length <= value) {
        this.data.players.push({
          name: "Player" + String(this.data.players.length + 1),
          score: { correct: 0, wrong: 0 },
        });
      } else if (this.data.players.length > value) {
        this.data.players.pop();
      }
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
