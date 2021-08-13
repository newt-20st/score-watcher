<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: { Header },
};
</script>
<style lang="scss">
body {
  font-size: 20px;
  margin: 0;
}
</style>
