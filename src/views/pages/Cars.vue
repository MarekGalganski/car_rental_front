<template>
  <v-container>
    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <v-row v-for="row in rows" :key="'row' + row">
        <v-col
          v-for="(car, column) in carsInRow(row)"
          :key="'row' + row + column"
        >
        <cars-list-item
          :brand="car.model"
          :model="car.brand"
          :price="100"
        >
        </cars-list-item>
        </v-col>
        <v-col v-for="place in placeholdersInRow(row)" :key="'placholder' + row + place"></v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import CarsListItem from '../../components/Cars/CarsListItem.vue';
import axios from '../../axios';

export default {
  name: 'Cars',
  components: {
    CarsListItem
  },
  data() {
    return {
      cars: null,
      loading: true,
      columns: 3
    }
  },
  computed: {
    rows() {
      return this.cars === null
      ? 0
      : Math.ceil(this.cars.length / this.columns);
    }
  },
  created() {
    axios
        .get('cars')
        .then((response) => {
          this.cars = response.data;
          this.cars.push({brand: 'x'});
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        })
  },
  methods: {
    carsInRow(row) {
      return this.cars.slice((row - 1) * this.columns, row * this.columns);
    },
    placeholdersInRow(row) {
      return this.columns - this.carsInRow(row).length;
    }
  }
}
</script>