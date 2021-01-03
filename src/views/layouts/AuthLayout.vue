<template>
  <v-main>
  <v-app-bar app dark color="primary">
    <v-app-bar-title class="text-uppercase font-weight-medium headline">
      Car rental
    </v-app-bar-title>
    <v-icon large class="ml-3">fas fa-car</v-icon>
    <v-spacer></v-spacer>
    <v-btn text rounded to="/register">Register</v-btn>
    <v-btn text rounded to="/login">Login</v-btn>
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