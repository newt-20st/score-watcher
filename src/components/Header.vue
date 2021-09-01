<template>
  <div class="header" v-if="this.$route.name != 'Display'">
    <router-link class="btn btn-success btn-sm" to="/">Scoreboard</router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  padding: 0.5rem;
}
</style>