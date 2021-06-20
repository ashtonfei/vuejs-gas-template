<template>
  <div>
    <h2>
      <router-link to="/" :class="$route.name === 'Home' ? 'active-link' : ''"
        >Home</router-link
      >
      <router-link
        to="/users"
        :class="$route.name === 'Users' ? 'active-link' : ''"
      >
        Users
      </router-link>
    </h2>
    <UsersTable :users="users" :loading="loading" />
  </div>
</template>

<script>
import UsersTable from "@/components/UsersTable";

export default {
  name: "Home",
  components: {
    UsersTable,
  },
  data: () => ({
    users: [],
    defaultUsers: [
      {
        id: 1,
        name: "Ashton 1",
        gender: "Male",
        email: "yunjia.fei@gmail.com",
        role: "admin",
        status: "active",
      },
      {
        id: 2,
        name: "Ashton 2",
        gender: "Male",
        email: "yunjia.fei@gmail.com",
        role: "staff",
        status: "active",
      },
      {
        id: 3,
        name: "Ashton 3",
        gender: "Female",
        email: "yunjia.fei@gmail.com",
        role: "manager",
        status: "inactive",
      },
    ],
    loading: true,
  }),
  created() {
    try {
      google.script.run
        .withSuccessHandler((response) => {
          const { success, message, data } = JSON.parse(response);
          if (success) {
            this.users = data;
          } else {
            alert(message);
          }
          this.loading = false;
        })
        .withFailureHandler((err) => {
          alert(err.message);
          this.loading = false;
        })
        .request(
          "GET",
          "users",
          "{}",
          "ZjAxYmE1MWEtZjc2YS00ZTc1LWE0ZjctYWYxNzgxMTNkNDYy"
        );
    } catch (err) {
      this.users = [...this.defaultUsers];
      this.loading = false;
    }
  },
};
</script>

<style scoped>
</style>