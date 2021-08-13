<template>
  <div class="error">
    <h1>Error</h1>
    <p>エラーが発生しました。最初からやり直してください。</p>
    <router-link to="/"> ホームに戻る </router-link>
  </div>
</template>

<script>
export default {
  name: "DisplayError",
};
</script>
