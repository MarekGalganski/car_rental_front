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
    <v-snackbar
      @input="updateNotification($event, index)"
      :key="index"
      v-for="(snackbar, index) in allNotifications"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="removeNotification(index)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      loggedIn: 'user/loggedIn',
      allNotifications: 'application/notifications'
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      checkUserState: 'user/setLoggedInState',
      removeNotification: 'application/removeNotification',
      addNotification: 'application/addNotification'
    }),
    logout() {
      this.logoutUser()
        .then(() => {
          this.addNotification({
            show: true,
            text: 'Logged out!'
          }).then(() => {
            this.$router.push('login');
          })
        });
    },
    updateNotification(show, index) {
      if (!show) {
        this.removeNotification(index)
      }
    }
  }
};
</script>
