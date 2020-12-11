<template>
  <v-main>
    <v-app-bar app>
      <v-btn small @click="logout" v-if="loggedIn">
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-main>
</template>

<script>

export default {
}
</script>
