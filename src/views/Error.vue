<template>
  <div class="error">
    <h1>Error</h1>
    <div class="content">
      <p>エラーが発生しました。最初からやり直してください。</p>
      <router-link to="/"> ホームに戻る </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "error",
};
</script>
<style lang="scss">
.error {
  margin: 1rem;
}
</style>
