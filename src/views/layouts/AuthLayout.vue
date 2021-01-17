<template>
  <v-main>
  <v-app-bar app>

      <v-toolbar-title>
        <div style="pointer-events: none">
        <v-btn to="login" color="primary">
          <v-icon left>mdi-car-multiple</v-icon>
          Car Rental
        </v-btn>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            to="register"
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>fas fa-user-circle</v-icon>
          </v-btn>
        </template>
        <span>Register</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            to="login"
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-btn>
        </template>
        <span>Log In</span>
      </v-tooltip>
    </v-app-bar>
  <router-view></router-view>
  <v-footer
    padless
    fixed
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
        {{ new Date().getFullYear() }} — <strong>Marek Galganski</strong>
      </v-col>
    </v-row>
  </v-footer>
  </v-main>
</template>

<script>
export default {

}
</script>