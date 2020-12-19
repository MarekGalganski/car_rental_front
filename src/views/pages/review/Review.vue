<template>
  <v-container>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <div v-if="alreadyReviewed">
        <h1>AlreadyReviewed</h1>
      </div>
      <div v-else>
        <div class="form-group">
          <label class="text-muted">Select the star rating (1 is worst - 5 is best)</label>
          <star-rating
            v-model="review.rating"
          ></star-rating>
        </div>
        <div class="form-group">
          <label class="text-muted">Describe your expirience</label>
          <v-textarea
            name="input-7-1"
            filled
            label="Label"
            auto-grow
            v-model="review.content"
          ></v-textarea>
          <v-btn color="primary" >review</v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from '../../../axios';

export default {
  name: 'Review',
  data() {
    return {
      review: {
        rating: 5,
        content: null
      },
      existingReview: null,
      loading: false
    }
  },
  created() {
    this.loading = true;

    axios.get(`reviews/${this.$route.params.id}`)
      .then(response => {
        this.existingReview = response.data.alreadyExists;
      })
      .catch(error => {
        console.error(error)
      })
      .then(() => {
        this.loading = false;
      });
  },
  computed: {
    alreadyReviewed() {
      return this.existingReview !== null;
    }
  }
}
</script>