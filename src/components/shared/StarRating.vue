<template>
  <v-container>
    <div class="d-flex">
      <v-icon
        v-for="star in fullStars"
        :key="'full' + star"
        @click="$emit('input', star)"
      >fas fa-star</v-icon>
      <v-icon v-if="halfStar">fas fa-star-half-alt</v-icon>
      <v-icon
        v-for="star in emptyStars"
        :key="'empty' + star"
        @click="$emit('input', fullStars + star)"
      >far fa-star</v-icon>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    value: Number
  },
  computed: {
    halfStar() {
      const fraction = Math.round(
        (this.value - Math.floor(this.value)) * 100
      );

      return fraction > 0 && fraction < 50;
    },
    fullStars() {
      return Math.round(this.value);
    },
    emptyStars() {
      return 5 - Math.ceil(this.value);
    }
  },
  created() {

  }
}
</script>