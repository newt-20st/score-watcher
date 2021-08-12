<template>
  <div class="home">
    <h1>scoreboard</h1>
    <h2>形式を選択</h2>
    <div class="formatList">
      <router-link to="/config?type=json"> 設定ファイルを読み込む </router-link>
      <router-link to="/config?type=nomx"> nomx </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style lang="scss" scoped>
.formatList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2vw;
  font-size: 2rem;
  margin: 2vw;
  a {
    display: block;
    background-color: $back-color;
    color: $base-color;
    text-decoration: none;
    border: 0.3rem solid $base-color;
    border-radius: 2rem;
    padding: 2rem;
    height: 25vh;
    transition: all ease-in 0.3s;
    &:hover {
      background-color: $base-color;
      color: $back-color;
    }
  }
}
</style>