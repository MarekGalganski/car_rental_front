<template>
  <v-container>
    <h3 class="text-secondary text-uppercase">ReviewList</h3>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <div
        class="border-bottom d-md-block"
        v-for="(review, index) in reviews"
        :key="index"
      >
        <v-row>
          <v-col cols="12" md="6">Maras</v-col>
          <v-col cols="12" md="6">
            {{review.rating}}
            <star-rating :value="review.rating"></star-rating>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">{{ review.created_at | fromNow }}</v-col>
        </v-row>
        <v-row>
          <v-col md="12">{{review.content}}</v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from '../../axios';

export default {
  props: {
    carId: [String, Number]
  },
  data() {
    return {
      loading: false,
      reviews: null
    }
  },
  created() {
    this.loading = true;

    axios.get(`cars/${this.carId}/reviews`)
      .then(response => {
        this.reviews = response.data;
      })
      .then(() => {
        this.loading = false;
      });
  }
}
</script>