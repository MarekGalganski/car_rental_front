<template>
  <v-container>
    <v-row>
        <v-col
          v-for="(car, index) in cars"
          :key="index"
          cols="12"
          md="6"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <cars-list-item
              v-bind="car"
            >
            </cars-list-item>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <paginate
          store="car"
          collection="cars"
        >
        </paginate>
      </div>
  </v-container>
</template>

<script>
import CarsListItem from '../../components/cars/CarsListItem';
import Paginate from '../../components/shared/Paginate';

export default {
  name: 'Cars',
  components: {
    CarsListItem,
    Paginate
  },
  data() {
    return {
      loading: true,
      columns: 3
    }
  },
  beforeCreate() {
    this.$store.dispatch('car/getList', 0)
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