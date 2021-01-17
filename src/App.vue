<template>
  <v-app>
    <router-view></router-view>
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
    this.checkUserState().then(() => {
      if (this.loggedIn) {
        this.addUserDetails()
        .then(() => {
          this.loadStoredState();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.setItem('token', '');
            localStorage.setItem('basket', '');
            this.addNotification({
              show: true,
              text: 'Please Log In!'
            }).then(() => {
              this.$router.push('login');
            })
          }
        });
      }
    });
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      allNotifications: 'application/notifications'
    })
  },
  methods: {
    ...mapActions({
      checkUserState: 'user/setLoggedInState',
      removeNotification: 'application/removeNotification',
      addNotification: 'application/addNotification',
      addUserDetails: 'user/setUserDetailsState',
      loadStoredState: 'basket/loadStoredState',
    }),
    updateNotification(show, index) {
      if (!show) {
        this.removeNotification(index)
      }
    }
  },
   mounted(){

    // window.onbeforeunload = function () {
    //     var storage = window.localStorage;
    //     storage.clear()
    // }
  }
};
</script>
