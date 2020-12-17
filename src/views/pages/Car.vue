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
        <availability :car-id="this.$route.params.id"></availability>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '../../axios';
import Availability from '../../components/cars/Availlability';
import ReviewList from '../../components/cars/ReviewList';

export default {
  name: 'Car',
  components: {
    Availability,
    ReviewList
  },
  data() {
    return {
      car: null,
      loading: false
    }
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
  }
}
</script>