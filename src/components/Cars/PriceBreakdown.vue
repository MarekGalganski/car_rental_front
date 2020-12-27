<template>
  <v-container>
    Total: {{ price.totalPrice }}
  </v-container>
</template>

<script>
export default {
  props: {
    price: Object
  }
}
</script>