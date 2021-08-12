<template>
  <Header />
  <transition mode="out-in">
    <router-view />
  </transition>
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
