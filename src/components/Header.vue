<template>
  <div class="header" v-if="this.$route.name != 'Display'">
    <router-link to="/">Back to Top</router-link>
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
a {
  display: inline-block;
  text-decoration: none;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: $base-color;
  color: $back-color;
  border-radius: 2rem;
  transition: all ease-in 0.2s;
  &:hover {
    opacity: 0.5;
  }
}
</style>