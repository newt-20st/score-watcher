const dialog = require("electron").remote.dialog;
import fs from "fs";
import Menu from '../components/ConfigMenu.vue'
export default {
    components: { Menu },
    methods: {
        configExport() {
            const jsonData = this.$store.state.config.format[this.data.type];
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
            const quizRaw = document.getElementById("quizRaw").value.split("\n");
            const dataArray = [];
            for (let i = 0; i < quizRaw.length; i++) {
                dataArray[i] = quizRaw[i].split(",");
            }
            this.data.quiz = dataArray;
        },
    }
}