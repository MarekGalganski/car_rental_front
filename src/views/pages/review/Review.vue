<template>
  <v-container>
    <v-row>
      <v-col
        :class="[{'d-none': oneColumn}]"
        md-4
      >
        <v-card
          elevation="5"
          outlined
          shaped
          tile
          :loading="loading"
        >
          <div v-if="hasCarBooking">
            <v-card-title>
              Stayed at
              <router-link :to="{name: 'car', params: { id: carBooking.car.car_id}}">{{ carBooking.car.brand }}</router-link>
            </v-card-title>
          </div>
        </v-card>
      </v-col>
      <v-col
       :cols="secondCol"
      >
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
              <v-btn color="primary" @click="storeReview()" :disabled="loading">review</v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../../../axios';
import { is404, is422 } from '../../../helpers/response';

export default {
  name: 'Review',
  data() {
    return {
      review: {
        id: null,
        rating: 5,
        content: null
      },
      existingReview: null,
      loading: false,
      carBooking: null,
      error: false,
    }
  },
  created() {
    this.review.id = this.$route.params.id;
    this.loading = true;

    axios.get(`reviews/${this.$route.params.id}`)
      .then(response => {
        this.existingReview = response.data.alreadyExists;
      })
      .catch(error => {
        if (is404(error)) {
          axios
            .get(`car-booking-by-review/${this.review.id}`)
            .then(response => {
              this.carBooking = response.data
            })
            .catch(error => {
              if (!is404(error)) {
                this.error = true;
              }
            });
        }

        this.error = true;
      })

      this.loading = false;
  },
  computed: {
    alreadyReviewed() {
      return this.hasReview; //|| !this.carBooking;
    },
    hasReview() {
      return this.existingReview !== null;
    },
    hasCarBooking() {
      return this.carBooking !== null;
    },
    oneColumn() {
      return !this.loading && this.alreadyReviewed;
    },
    secondCol() {
      if (this.loading || !this.alreadyReviewed) {
        return 8;
      } else {
        return 12;
      }
    },
  },
  methods: {
    storeReview() {
      this.loading = true;
      axios.post('reviews', this.review)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (is422(error)) {
            // const errors = error.response.data.errors;

            // console.log(_.size(errors));
          }

          this.error = true;
        })
        .then(() => {
          this.loading = false;
        })
    }
  }
}

</script>