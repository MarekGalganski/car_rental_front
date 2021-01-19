<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
      height="250"
    >
    <v-card-title class="primary lighten-1">
          <span class="title white--text">{{ model }}</span>

          <v-spacer></v-spacer>

          <v-btn
            outlined
            color="white"
            :to="{ name: 'car', query: {id: id} }"
          >
            Details
          </v-btn>
        </v-card-title>
      <v-card-text>
        <div class="my-1">
          <span class="blue--text overline">
            {{ brand }}
          </span>
        </div>
        <div class="text--primary">
          {{ description }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    model: String,
    brand: String,
    id: Number,
    description: String
  }
}
</script>