<template>
  <v-container>
    <div v-if="loading">
      <loading></loading>
    </div>
    <div v-else>
      <p class="headline text-secondary text-uppercase">Reviews</p>
      <div
        class="border-bottom"
        v-for="(review, index) in reviews"
        :key="index"
      >
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" align="center" justify="center">{{ review.name }}</v-col>
          <v-col cols="12" md="6" align="center" justify="center">
            <star-rating :value="review.rating"></star-rating>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
           {{review.content}}
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
           Added {{ review.created_at | fromNow }}
          </v-col>
        </v-row>
        <hr />
      </div>
      <div class="text-center">
        <paginate
          store="review"
          collection="reviews"
          class="mb-3 mt-5"
        >
        </paginate>
      </div>
    </div>
  </v-container>
</template>

<script>
import Paginate from '../shared/Paginate';
import Loading from '../shared/Loading';

export default {
  props: {
    carId: [String, Number]
  },
  components: {
    Paginate,
    Loading
  },
  data() {
    return {
      loading: false,
      error: false
    }
  },
  created() {
    this.loading = true;
    let payload = {'carId': this.$props.carId, 'pageNumber': 0};
    this.$store.dispatch('review/getList', payload)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.error = true;
      });
  },
  computed: {
    reviews: {
      get() {
        return this.$store.state.review.reviews.data;
      }
    }
  }
}
</script>