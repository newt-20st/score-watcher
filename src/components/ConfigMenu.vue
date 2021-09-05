<template>
  <div class="menu">
    <button class="btn btn-primary" type="button" @click="quizUpdate()">
      問題データを更新
    </button>
    <button class="btn btn-primary" type="button" @click="configExport()">
      設定ファイルをエクスポート
    </button>
    <router-link class="btn btn-success" :to="'/display/?type=' + this.format">
      得点表示画面を開く
    </router-link>
  </div>
</template>

<script>
const dialog = require("electron").remote.dialog;
import fs from "fs";
export default {
  name: "ConfigMenu",
  props: ["format", "quizRaw"],
  methods: {
    configExport() {
      const jsonData = this.$store.state.config.format[this.format];
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
          JSON.stringify(
            this.$store.state.config.format[this.data.type],
            null,
            "\t"
          )
        );
      }
    },
    quizUpdate() {
      const quizRaw = this.quizRaw.split("\n");
      const dataArray = [];
      for (let i = 0; i < quizRaw.length; i++) {
        dataArray[i] = quizRaw[i].split(",");
      }
      console.log(dataArray);
      this.$emit("quiz-field", dataArray);
    },
  },
};
</script>

<style>
</style>