<template>
  <div>
    <h2>
      <a :class="$route.name === 'signin' ? 'active-link' : ''">Sign in</a>
    </h2>

    <div class="logos">
      <img src="../assets/logo.png" />
      <img src="../assets/gas.svg" />
    </div>

    <form @submit.prevent="onSignin">
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
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  data: () => ({
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
    ...mapActions("user", {
      signin: "signin",
    }),
    onSignin() {
      const email = this.form.email.value.toLowerCase();
      const password = this.form.password.value;
      this.signin({ email, password });
    },
  },
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