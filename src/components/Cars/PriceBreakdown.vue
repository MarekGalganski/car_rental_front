<template>
  <v-container class="px-1">
    <div>
      <p class="headline text-uppercase">Price Breakdown</p>
      <v-divider></v-divider>
      <div style="display: flex;justify-content: space-between" class="py-1">
        <span>Days</span>
        <span>{{price.breakdown.days}}</span>
      </div>
      <v-divider></v-divider>
      <div style="display: flex;justify-content: space-between" class="py-1">
        <span>Price</span>
        <span>€{{price.breakdown.price}}</span>
      </div>
      <v-divider></v-divider>
      <div style="display: flex;justify-content: space-between" class="py-1">
        <span>Total Price</span>
        <span>€{{price.totalPrice}}</span>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    price: Object
  }
}
</script>
