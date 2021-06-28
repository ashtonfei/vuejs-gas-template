<template>
  <div>
    <h2>
      <router-link to="/" :class="$route.name === 'home' ? 'active-link' : ''">
        Home
      </router-link>
      <router-link
        to="/users"
        :class="$route.name === 'users' ? 'active-link' : ''"
      >
        Users
      </router-link>
    </h2>
    <span v-if="user"
      >Hello, {{ user.name }}, you are logged in as {{ user.role }}. Click to
      <a href="#" @click="onSignout">Sign out</a>.</span
    >

    <div class="logos">
      <img src="../assets/logo.png" />
      <img src="../assets/gas.svg" />
    </div>
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
          <a href="http://vue-loader.vuejs.org/" target="_blank">
            vue-loader
          </a>
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
      <li>
        <a class="gas-blue" href="https://github.com/ashtonfei">Github</a>
      </li>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  data: () => ({
    msg: "Welcome to Your Web Application Powered by VueJS and GAS",
  }),
  computed: {
    ...mapState("auth", {
      user: "user",
    }),
  },
  methods: {
    ...mapActions("auth", {
      signout: "signout",
    }),
    onSignout() {
      this.signout();
    },
  },
};
</script>

<style scoped>
</style>