<template>
  <v-main>
  <v-app-bar app>

      <v-toolbar-title>
        <v-btn to="login" color="primary">
          <v-icon left>mdi-car-multiple</v-icon>
          Car Rental
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="register" color="primary" icon>
        <v-icon>fas fa-user-circle</v-icon>
      </v-btn>

      <v-btn to="login" color="primary" icon>
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
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