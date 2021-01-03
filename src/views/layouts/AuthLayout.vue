<template>
  <v-main>
  <v-app-bar app dark color="primary">
    <v-app-bar-title class="text-uppercase font-weight-medium">Car rental</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded to="/register">Register</v-btn>
    <v-btn text rounded to="/login">Login</v-btn>
  </v-app-bar>
  <router-view></router-view>
  </v-main>
</template>

<script>
export default {
  
}
</script>