<template>
  <div class="header" v-if="this.$route.name != 'Display'">
    <router-link to="/"
      ><img src="@/assets/image/oneline-transparent.png"
    /></router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
  padding: 0.5rem;
  text-align: center;
  img {
    max-height: 10vh;
  }
}
</style>