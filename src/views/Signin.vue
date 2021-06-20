<template>
  <div>
    <h2>
      <router-link
        to="/signin"
        :class="$route.name === 'Sign in' ? 'active-link' : ''"
        >Sign in</router-link
      >
    </h2>

    <div class="logos">
      <img src="../assets/logo.png" />
      <img src="../assets/gas.svg" />
    </div>

    <form @submit.prevent="signin">
      <div>
        <label :for="form.email.name">{{ form.email.label }}</label
        ><br />
        <input
          type="text"
          :id="form.email.name"
          :placeholder="form.email.placeholder"
          v-model.trim="form.email.value"
        />
      </div>
      <div>
        <label :for="form.password.name">{{ form.password.label }}</label
        ><br />
        <input
          type="password"
          :id="form.password.name"
          :placeholder="form.password.placeholder"
          v-model.trim="form.password.value"
        />
      </div>
      <div>
        <input type="submit" value="Sign in" />
      </div>
    </form>
  </div>
</template>

<script>
import { getLocalItem, setLocalItem } from "@/utils.js";

export default {
  name: "Home",
  components: {},
  data: () => ({
    user: null,
    defaultUser: {
      name: "Ashton Fei",
      email: "ashton.fei@gmail.com",
      role: "admin",
      status: "active",
    },
    form: {
      email: {
        label: "Email",
        name: "email",
        value: "",
        placeholder: "Your email address",
      },
      password: {
        label: "Password",
        name: "password",
        value: "",
        placeholder: "Your password",
      },
    },
    loading: true,
  }),
  methods: {
    signin() {
      const email = this.form.email.value;
      const password = this.form.password.value;
      console.log(email, password);
      if (!email) return alert("email is required");
      if (!password) return alert("password is required");
      try {
        google.script.run
          .withSuccessHandler((response) => {
            const { success, message, data, token } = JSON.parse(response);
            if (success) {
              this.user = data;
              this.token = token;
              setLocalItem("token", token);
            } else {
              alert(message);
            }
            this.loading = true;
          })
          .withFailureHandler((err) => {
            this.loading = false;
            alert(err.message);
          })
          .signin(email, password);
      } catch (err) {
        this.user = this.defaultUser;
        this.loading = false;
        this.$router.push("/");
      }
    },
  },
  created() {},
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
form div {
  margin-bottom: 24px;
}
form input {
  width: 360px;
  padding: 12px;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 3px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
form input[type="submit"] {
  background-color: #42b983;
  color: white;
}
</style>