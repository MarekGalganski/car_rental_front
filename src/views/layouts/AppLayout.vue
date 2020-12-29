<template>
  <v-main>
    <v-app-bar app>
      <v-btn small @click="logout" v-if="loggedIn">
        Logout
      </v-btn>
      <router-link :to="{name: 'basket'}">
        <v-btn small v-if="loggedIn">
          {{ itemsInBasket }}
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppLayout',
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn',
      itemsInBasket: 'basket/itemsInBasket'
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      addNotification: 'application/addNotification',
    }),
    logout() {
      this.logoutUser()
        .then(() => {
          this.loadStoredState();
          this.addNotification({
            show: true,
            text: 'Logged out!'
          }).then(() => {
            this.$router.push('login');
          })
        });
    }
  },
};
</script>
