<template>
  <v-container>
    <v-row>
      <v-col
        md="8"
      >
        Checkout form
      </v-col>
      <v-col
        md="4"
      >
        <div v-for="item in basket" :key="item.car.id">
          <router-link :to="{name: 'car', params: {id: item.car.id}}">{{ item.car.brand }}</router-link>
          <v-btn color="primary" @click="removeFromBasket(item.car.id)">Delete</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Basket',
  computed: {
    ...mapGetters({
      itemsInBasket: 'basket/itemsInBasket',
      basket: 'basket/basket'
    })
  },
  methods: {
    ...mapActions({
      removeFromBasket: 'basket/removeFromBasket'
    }),
  }
}
</script>