<template>
  <v-container>
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
      height="250"
    >
    <v-card-title class="cyan darken-1">
          <span class="headline white--text">Sarah Mcbeal</span>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>
      <v-card-text>
        <div>
          <router-link :to="{ name: 'car', params: { id: id } }">
            {{ brand }}
          </router-link>
        </div>
        <div class="text--primary" height="50">
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