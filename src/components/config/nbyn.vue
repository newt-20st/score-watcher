<template>
  <div class="config">
    <h1>N by N</h1>
    <div class="content">
      <form>
        <div class="formNotice">
          ※
          <span class="badge badge-danger">必須</span>
          ：必ず設定の確認が必要と思われる項目です
        </div>
        <h2>形式設定</h2>
        <div class="row">
          <div class="form-group col-sm">
            <label>イベント名</label>
            <input class="form-control" v-model="data.name" type="text" />
            <small class="form-text text-muted">画面の右上に表示されます</small>
          </div>
          <div class="form-group col-sm-4">
            <label>N <span class="badge badge-danger">必須</span></label>
            <input
              class="form-control"
              v-model="data.config.n"
              type="number"
              min="1"
            />
            <small class="form-text text-muted">Nを設定してください</small>
          </div>
          <div class="form-group col-sm-4">
            <label>勝ち抜け人数</label>
            <input
              class="form-control"
              v-model="data.config.winThrough.count"
              type="number"
              min="1"
              :max="data.players.length"
            />
            <small class="form-text text-muted"></small>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-sm-4">
            <div class="form-check">
              <input
                class="form-check-input"
                v-model="data.config.end.enable"
                id="endEnable"
                type="checkbox"
                checked
              />
              <label class="form-check-label" for="endEnable">
                限定問題数を
                <span v-if="data.config.end.enable">設定する</span
                ><span v-else>設定しない</span>
              </label>
              <small class="form-text text-muted"
                >設定しない場合1000問が上限となり、それ以降は不具合が発生する可能性があります</small
              >
            </div>
          </div>
          <div class="form-group col-sm-4" v-show="data.config.end.enable">
            <label>限定問題数</label>
            <input
              class="form-control"
              v-model="data.config.end.count"
              type="number"
              min="1"
              max="1000"
            />
          </div>
        </div>
        <h2>参加者設定</h2>
        <div class="row">
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
            <small class="form-text text-muted">※最大10人</small>
          </div>
        </div>
        <div class="playerSetting">
          <div v-for="(player, index) of data.players" :key="index">
            <h3>{{ index + 1 }}人目のプレイヤーデータ</h3>
            <div class="row">
              <div class="form-group col-sm-4">
                <label>プレイヤーネーム</label>
                <input class="form-control" type="text" v-model="player.name" />
              </div>
              <div class="form-group col-sm-4">
                <label>正解数</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="player.score.correct"
                />
              </div>
              <div class="form-group col-sm-4">
                <label>誤答数</label>
                <input
                  class="form-control"
                  type="number"
                  v-model="player.score.wrong"
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
          <router-link
            class="btn btn-success"
            :to="'/display/?type=' + this.data.type"
          >
            コントロール画面を開く
          </router-link>
          <button class="btn btn-primary" type="button" @click="quizUpdate()">
            問題データを更新
          </button>
          <button class="btn btn-primary" type="button" @click="configExport()">
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
import configMenu from "../../mixin/configMenu.js";
export default {
  name: "nbyn",
  data() {
    return {
      data: this.$store.state.config.format.nbyn,
      base: {},
      quizRaw: this.$store.state.quiz,
    };
  },
  updated() {
    store.commit("update", this.data);
    store.commit("quiz", this.quizRaw);
  },
  mixins: [configMenu],
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
              evaluation: 0,
            },
          });
        } else {
          list.push({
            name: "Player" + String(i + 1),
            score: { correct: 0, wrong: 0, evaluation: 0 },
          });
        }
      }
      this.data.players = list;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>