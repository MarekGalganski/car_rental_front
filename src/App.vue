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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  created() {
    this.checkUserState();
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      checkUserState: 'user/setLoggedInState'
    }),
    logout() {
      this.logoutUser()
        .then(() => {
          this.$router.push('login');
        });
    }
  }
};
</script>
