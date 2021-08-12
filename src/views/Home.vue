<template>
  <div class="home">
    <h1>scoreboard</h1>
    <h2>形式を選択</h2>
    <router-link to="/setting?type=nomx"> nomx </router-link>
    <h3>設定ファイルを読み込む</h3>
    <button @click="openConfig()">設定ファイルを開く</button>
    <div v-if="this.load">
      <router-link
        :to="
          '/control/?type=' + this.$store.state.config.format[this.load].type
        "
        >このゲームを開始する</router-link
      >
    </div>
  </div>
</template>

<script>
import store from "../store";
const dialog = require("electron").remote.dialog;
const fs = require("fs");
export default {
  name: "Home",
  data() {
    return {
      load: false,
    };
  },
  methods: {
    openConfig() {
      const options = {
        title: "設定ファイルを開く",
        filters: [
          {
            name: "Documents",
            multiSelections: false,
            extensions: ["json", "*"],
          },
        ],
      };
      const result = dialog.showOpenDialogSync(options);
      if (result.length) {
        const jsonData = JSON.parse(fs.readFileSync(result[0]));
        console.log(jsonData);
        this.load = jsonData.type;
        store.commit("loadConfig", jsonData.type, jsonData);
      }
    },
  },
};
</script>
