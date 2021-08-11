<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <div style="display: flex">
      <button @click="open">ファイルを開く</button>
      <button @click="save">ファイルを保存</button>
    </div>
    <div style="width: 100%; flex-grow: 1">
      <textarea
        style="width: 100%; height: 100%; box-sizing: border-box"
        v-model="text"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
const dialog = require("electron").remote.dialog;
const fs = require("fs");

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function () {
    return {
      text: "",
    };
  },
  methods: {
    open: function () {
      const options = {
        title: "ファイルを開く",
        filters: [
          {
            name: "Documents",
            multiSelections: false,
            extensions: ["txt", "*"],
          },
        ],
      };
      const result = dialog.showOpenDialogSync(options);
      if (result.length) {
        this.text = fs.readFileSync(result[0]);
      }
    },
    save: function () {
      const options = {
        title: "ファイルを開く",
        filters: [{ name: "Documents", extensions: ["txt"] }],
      };
      const result = dialog.showSaveDialogSync(options);
      // resultはstring
      if (result) {
        fs.writeFileSync(result, this.text);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>