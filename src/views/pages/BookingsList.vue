<template>
  <v-container>
    asdf
  </v-container>
</template>

<script>
import axios from '../../axios/index';

export default {
  name: 'BookingsList',
  data() {
    return {
      loading: false,
    }
  },
  beforeCreate() {
    this.loading = true;
    const userId = sessionStorage.getItem('userId');
    console.log(userId);
    if (userId) {
      axios.get(`bookings/${userId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      // this.$router.push('bookings-list');
    }
      this.loading = false;
  }
}
</script>