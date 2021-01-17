<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="8"
      >
      <span class="display-1 ml-1">History of Bookings</span>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-btn
          class="float-right mr-1"
          color="primary"
          :to="{ name: 'profile'}"
        >
          Change Your Details
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :headers="headers"
      :items="bookings"
      :options.sync="options"
      :server-items-length="totalBookings"
      :loading="loading"
      :disable-sort="true"
      class="elevation-1 mb-12"
    >
    <template v-slot:item.created_at="{ item }">
      {{ item.created_at | dd.mm.yy HH:mm }}
    </template>
    <template v-slot:item.from="{ item }">
      {{ item.from | dd.mm.yy }}
    </template>
    <template v-slot:item.to="{ item }">
      {{ item.to | dd.mm.yy }}
    </template>
      </v-data-table>
  </v-container>
</template>

<script>
import axios from '../../axios/index';
import { mapActions } from 'vuex';

export default {
  name: 'BookingsList',
  data() {
    return {
      page: 1,
      totalBookings: 0,
      numberOfPages: 0,
      bookings: [],
      loading: true,
      options: {},
      headers: [
          { text: 'Date', value: 'created_at', class: "title" },
          { text: 'Brand', value: 'car_brand', class: "title" },
          { text: 'Model', value: 'car_model', class: "title" },
          { text: 'From', value: 'from', class: "title" },
          { text: 'To', value: 'to', class: "title" },
          { text: 'Price [€]', value: 'price', class: "title" },
        ],
    }
  },
  watch: {
    options: {
      handler() {
        this.getBookings();
      },
    },
    deep: true,
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification',
    }),
    getBookings() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page;
      const userId = sessionStorage.getItem('userId');

      axios.get(`bookings/${userId}` + '?page=' + pageNumber + '&perPage=' + itemsPerPage)
        .then(response => {
          this.bookings = response.data.data;
          this.totalBookings = response.data.meta.total;
          this.numberOfPages = response.data.meta.last_page;
        })
        .catch(() => {
          this.addNotification({
              show: true,
              text: 'Something went wrong!'
            }).then(() => {
              this.$router.push('cars');
            })
        })

        this.loading = false

    }
  },
  mounted() {
    this.getBookings();
  }
}
</script>