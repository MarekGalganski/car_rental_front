<template>
  <v-container>
      <v-row>
        <h2>Check Availability</h2>
         <v-form
          ref="availabityForm"
        >
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
          v-model="from"
          label="from"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="to"
            label="to"
            required
            @keyup.enter="checkAvailability()"
          ></v-text-field>
        </v-col>
        <v-btn
            color="primary"
            @click="checkAvailability()"
          >
            Check
          </v-btn>
        </v-form>
      </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      from: null,
      to: null
    }
  },
  methods: {
    checkAvailability() {
      alert('zd');
    }
  }
}
</script>