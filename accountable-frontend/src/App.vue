<template>
  <v-app id="app">
    <topbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Topbar from "@/components/topbar";
export default {
  components: { Topbar }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
