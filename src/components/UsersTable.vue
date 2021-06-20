<template>
  <table>
    <thead>
      <th v-for="{ text, key } in headers" :key="key">{{ text }}</th>
    </thead>
    <div v-if="loading">Loading...</div>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td v-for="{ key } in headers" :key="key">{{ user[key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "UsersTable",
  props: {
    users: Array,
    loading: Boolean,
  },
  data: () => ({
    headers: [
      { text: "ID", key: "id" },
      { text: "Name", key: "name" },
      { text: "Email", key: "email" },
      { text: "Role", key: "role" },
      { text: "Status", key: "status" },
      { text: "Gender", key: "gender" },
    ],
  }),
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
tr,
th,
td {
  width: auto;
  border-bottom: 1px solid #2c3e50;
  padding: 6px 3px;
}
</style>