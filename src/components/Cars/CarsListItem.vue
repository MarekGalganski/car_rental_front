<template>
  <v-container>
    <v-card
    elevation="2"
    >
    <router-link :to="{ name: 'car', params: { id: id } }">
      <v-card-title>{{ brand }}</v-card-title>
    </router-link>
    <v-card-title>{{ brand }}</v-card-title>
    <v-card-text>
      <div>{{ model }}</div>
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    model: String,
    brand: String,
    id: Number
  }
}
</script>