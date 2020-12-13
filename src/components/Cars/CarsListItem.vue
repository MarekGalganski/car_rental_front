<template>
  <v-container>
    <v-card
    elevation="2"
    >
    <v-card-title>{{ brand }}</v-card-title>
    <v-card-text>

      <div>{{ model }} {{price}}</div>
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    model: String,
    brand: String,
    price: Number
  }
}
</script>