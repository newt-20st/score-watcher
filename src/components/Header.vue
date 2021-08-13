<template>
  <div class="header" v-if="this.$route.name != 'Display'">
    <router-link class="btn btn-success btn-sm" to="/">scoreboard</router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return { visible: this.$store.state.common.header };
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: right;
  padding: 0.5rem;
}
</style>