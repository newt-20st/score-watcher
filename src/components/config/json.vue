<template>
  <div class="config">
    <h1>設定ファイルを読み込む</h1>
    <button class="btn btn-primary" @click="openConfig()">
      設定ファイルを開く
    </button>
    <div v-if="this.load">
      <h2>読み込み結果</h2>
      <h3>形式</h3>
      {{ data.type }}
      <p>
        <router-link
          class="btn btn-success"
          :to="
            '/display/?type=' + this.$store.state.config.format[this.load].type
          "
          >このゲームを開始する</router-link
        >
      </p>

      <p></p>
    </div>
  </div>
</template>

<script>
import store from "../../store";
const dialog = require("electron").remote.dialog;
const fs = require("fs");
export default {
  name: "nomx",
  data() {
    return {
      load: false,
      data: {},
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
        this.load = jsonData.type;
        this.data = jsonData;
        store.commit("loadConfig", jsonData.type, jsonData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>