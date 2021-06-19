<template>
  <div id="app">
    <div class="logos">
      <img src="./assets/logo.png" />
      <img src="./assets/gas.svg" />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logos img {
  width: 200px;
}
</style>
