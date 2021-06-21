<template>
  <div>
    <h2>
      <router-link to="/" :class="$route.name === 'home' ? 'active-link' : ''"
        >Home</router-link
      >
      <router-link
        to="/users"
        :class="$route.name === 'users' ? 'active-link' : ''"
      >
        Users
      </router-link>
    </h2>
    <UsersTable :users="users" :loading="loading" />
  </div>
</template>

<script>
import { getToken, TEST_TOKEN } from "@/utils.js";
import UsersTable from "@/components/UsersTable";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    UsersTable,
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
    ...mapGetters("users", {
      activeUsers: "activeUsers",
      activeUsersCount: "activeUsersCount",
    }),
  },
  data: () => ({
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
    this.$store.dispatch("users/getAllUsers").then(() => {
      this.loading = false;
    });
  },
};
</script>

<style scoped>
</style>