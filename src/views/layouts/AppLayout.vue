<template>
  <v-main>
    <v-app-bar app dark color="primary">
      <router-link :to="{ name: 'cars'}">
        <v-app-bar-title class="text-uppercase font-weight-medium headline white--text">
          <v-icon x-large>fas fa-car-side</v-icon>
        </v-app-bar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        dark
        rounded
        to="profile"
        v-if="loggedIn"
        class="mx-1"
      >
        <v-icon>fas fa-user-cog</v-icon>
      </v-btn>
      <v-btn
        color="primary"
        dark
        rounded
        @click="logout"
        v-if="loggedIn"
      >
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
  </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer
      padless
      dark
      color="primary"
    >
    <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="py-4 text-center white--text"
          cols="12"
          color="primary"
        >
          {{ new Date().getFullYear() }} — <strong>Car Rental</strong>
        </v-col>
      </v-row>
    </v-footer>
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
