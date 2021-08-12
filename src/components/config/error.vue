<template>
  <div class="home">
    <h1>7o3x</h1>
    <h2>設定</h2>
    <h3>プレイヤーの人数</h3>
    <input
      :value="players.length"
      @input="number($event.target.value)"
      max="10"
      type="number"
    />
    <h3>各プレイヤーの設定</h3>
    <div class="playerSetting">
      <div v-for="(player, index) of players" :key="index">
        <h4>{{ index + 1 }}人目のプレイヤーデータ</h4>
        プレイヤーネーム：<input type="text" v-model="player.name" />
        初期値：<input type="number" v-model="player.score" />
      </div>
    </div>
    <router-link to="/control/?type=nomx"> コントロール画面を開く </router-link>
  </div>
</template>

<script>
import store from "../../store";
export default {
  name: "ConfigError",
  data: function () {
    return {
      type: {},
      config: {},
      players: [{ name: "", score: 0 }],
    };
  },
  updated() {
    store.commit("update", this.players);
  },
  methods: {
    number(value) {
      if (this.players.length <= value) {
        this.players.push({ name: "", score: 0 });
      } else if (this.players.length > value) {
        this.players.pop();
      }
    },
  },
};
</script>
