<template>
  <v-container>
    <div class="d-flex">
      <v-icon v-for="star in fullStars" :key="'full' + star">fas fa-star</v-icon>
      <v-icon v-if="halfStar">fas fa-star-half-alt</v-icon>
      <v-icon v-for="star in emptyStars" :key="'empty' + star">far fa-star</v-icon>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    rating: Number
  },
  computed: {
    halfStar() {
      const fraction = Math.round(
        (this.rating - Math.floor(this.rating)) * 100
      );

      return fraction > 0 && fraction < 50;
    },
    fullStars() {
      return Math.round(this.rating);
    },
    emptyStars() {
      return 5 - Math.ceil(this.rating);
    }
  },
  created() {

  }
}
</script>