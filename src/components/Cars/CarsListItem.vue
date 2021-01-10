<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="344"
      height="200%"
      outlined
    >
      <v-card-text>
      <div>
        <router-link :to="{ name: 'car', params: { id: id } }">
          {{ model }}
        </router-link>
      </div>
      <p class="display-1 text--primary">
          {{ brand }}
      </p>
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