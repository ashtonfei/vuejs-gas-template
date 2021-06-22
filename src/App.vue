<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getToken, TEST_USER } from "@/utils";
export default {
  name: "App",

  created() {
    const token = getToken();
    if (token === null || token === "null") return;
    try {
      google.script.run
        .withSuccessHandler((response) => {
          const { success, message, data } = JSON.parse(response);
          if (!success) return alert(message);
          this.$store.commit("user/setUser", data);
        })
        .withFailureHandler((err) => {
          alert(err.message);
        })
        .validateToken(token);
    } catch (err) {
      this.$store.commit("user/setUser", TEST_USER);
    }
  },
  beforeMount() {
    try {
      google.script.url.getLocation((location) => {
        if (this.$route.name !== location.hash)
          this.$router.push({ name: location.hash });
      });
    } catch (err) {
      //pass
    }
  },
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.gas-blue {
  color: #4285f4;
}
h2 a {
  display: inline-block;
  margin: 3px;
  font-weight: bold;
  color: #2c3e50;
}
.active-link {
  color: #42b983;
}
</style>
