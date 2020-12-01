<template>
  <v-app>
    <v-app-bar app>
      <v-btn small @click="logout" v-if="loggedIn">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    loggedIn: false,
  }),
  created() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('login');
    }
  }
};
</script>
