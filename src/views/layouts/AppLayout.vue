<template>
  <v-main>
    <v-app-bar app>

      <v-toolbar-title>
        <v-btn :to="{ name: 'cars'}" class="ma-2 white--text" color="primary">
          <v-icon left>mdi-car-multiple</v-icon>
          Car Rental
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :to="{ name: 'basket'}"
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-badge
              :content="itemsInBasket"
              :value="itemsInBasket"
              color="primary"
              overlap
            >
              <v-icon>
                mdi-cart-outline
              </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>Basket</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :to="{ name: 'bookings-list'}"
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>
        </template>
        <span>User</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="logout"
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>
    <v-main class="pt-4">
      <router-view></router-view>
    </v-main>
    <v-footer
      padless
      dark
      color="primary"
      fixed
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
      itemsInBasket: 'basket/itemsInBasket',
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      addNotification: 'application/addNotification',
      checkUserState: 'user/setLoggedInState',
      addUserDetails: 'user/setUserDetailsState',
      loadStoredState: 'basket/loadStoredState',
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
