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
          <v-col cols="12" md="6" align="center" justify="center">
            <span class="title">
              {{ review.name }}
            </span>
          </v-col>
          <v-col cols="12" md="6" align="center" justify="center" style="pointer-events: none">
            <div class="float-right">
              <star-rating :value="review.rating"></star-rating>
            </div>
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
          class="mb-1 mt-5"
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
  beforeCreate() {
    this.loading = true;
    let payload = {'carId': this.$route.query.id, 'pageNumber': 0};
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