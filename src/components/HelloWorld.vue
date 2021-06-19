<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank"> Core Docs </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank"> Forum </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank"> Community Chat </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank"> Twitter </a>
      </li>
      <br />
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank"> vue-router </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank"> vuex </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank"> vue-loader </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
    <h2>Google Apps Script</h2>
    <li>
      <a class="gas-blue" href="https://developers.google.com/apps-script"
        >Apps Script</a
      >
    </li>
    <li>
      <a
        class="gas-blue"
        href="https://developers.google.com/apps-script/guides/web"
        >Web Apps</a
      >
    </li>
    <h2>Ashton Fei</h2>
    <li>
      <a class="gas-blue" href="https://youtube.com/ashtonfei">YouTube</a>
    </li>
    <li>
      <a class="gas-blue" href="https://twitter.com/ashton_fei">Twitter</a>
    </li>
    <li><a class="gas-blue" href="https://github.com/ashtonfei">Github</a></li>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Web Application Powered by VueJS and GAS",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
