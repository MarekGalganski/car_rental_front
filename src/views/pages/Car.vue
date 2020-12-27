<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
        align="center"
      >
      <div v-if="!loading">
        {{car.brand}}
      </div>
      <div v-else>Loading...</div>
      <review-list :car-id="this.$route.params.id"></review-list>
      </v-col>
      <v-col
        cols="12"
        md="4"
        align="center"
      >
        <availability :car-id="this.$route.params.id" @availability="checkPrice($event)"></availability>
        <price-breakdown :price="price"></price-breakdown>
          <v-btn
            color="primary"
            v-if="price"
          >
            Book now
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../../axios';
import { mapGetters } from "vuex";
import Availability from '../../components/cars/Availlability';
import ReviewList from '../../components/cars/ReviewList';
import PriceBreakdown from '../../components/cars/PriceBreakdown';

export default {
  name: 'Car',
  components: {
    Availability,
    ReviewList,
    PriceBreakdown
  },
  data() {
    return {
      car: null,
      loading: false,
      price: null
    }
  },
  computed: {
    ...mapGetters({
      from: 'booking/from',
      to: 'booking/to',
    })
  },
  created() {
    this.loading = true;

    axios.get(`cars/${this.$route.params.id}`)
      .then((response) => {
        this.car = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      })
  },
  methods: {
    checkPrice(hasAvailability) {
      if (!hasAvailability) {
        this.price = null;
        return;
      }

      axios.get(`cars/${this.$route.params.id}/price?from=${this.from}&to=${this.to}`)
        .then((response) => {
          this.price = response.data.data;
        })
        .catch(() => {
          this.price = null;
        })
    }
  }
}
</script>