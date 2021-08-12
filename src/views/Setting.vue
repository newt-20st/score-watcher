<template>
  <div class="home">
    <h1>7o3x</h1>
    <h2>設定</h2>
    <h3>プレイヤーの人数</h3>
    <input v-model="number" max="10" />
    <h3>各プレイヤーの設定</h3>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
