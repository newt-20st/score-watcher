<template>
  <div class="control">
    <h1>設定ファイルを読み込む</h1>
    <button @click="openConfig()">設定ファイルを開く</button>
    <div v-if="this.load">
      <router-link
        :to="
          '/display/?type=' + this.$store.state.config.format[this.load].type
        "
        >このゲームを開始する</router-link
      >
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

<style lang="scss" scoped>
</style>