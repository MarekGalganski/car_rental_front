<template>
  <v-container>
    <div v-if="loading">
      <loading></loading>
    </div>
    <div v-else>
    <v-row>
      <v-col
        v-for="(car, index) in cars"
        :key="index"
        cols="12"
        md="4"
      >
        <cars-list-item v-bind="car"></cars-list-item>
      </v-col>
    </v-row>
      <div class="text-center">
        <paginate
          store="car"
          collection="cars"
          class="mb-12"
        >
        </paginate>
      </div>
    </div>
  </v-container>
</template>

<script>
import CarsListItem from '../../components/cars/CarsListItem';
import Paginate from '../../components/shared/Paginate';
import Loading from '../../components/shared/Loading';

export default {
  name: 'Cars',
  components: {
    CarsListItem,
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

    this.$store.dispatch('car/getList', 0)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.error = true;
      });
  },
  computed: {
    cars: {
      get() {
        return this.$store.state.car.cars.data;
      }
    }
  },
}
// <div v-if="loading">Data is loading...</div>
//     <div v-else>
//       <v-row v-for="row in rows" :key="'row' + row">
//         <v-col
//           v-for="(car, column) in carsInRow(row)"
//           :key="'row' + row + column"
//         >
//         <cars-list-item
//           v-bind="car"
//         >
//         </cars-list-item>
//         </v-col>
//         <v-col v-for="place in placeholdersInRow(row)" :key="'placholder' + row + place"></v-col>
//       </v-row>
//     </div>
</script>