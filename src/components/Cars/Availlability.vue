<template>
  <v-container>
      <v-row>
        <h2>
          Check Availability
          <span v-if="noAvailability">(NOT AVAILABLE)</span>
          <span v-if="hasAvailability">(AVAILABLE)</span>
        </h2>
         <v-form
          ref="availabityForm"
        >
        <v-col
          cols="6"
          md="6"
        >
          <v-text-field
          v-model="from"
          label="from"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="6"
          md="6"
        >
          <v-text-field
            v-model="to"
            label="to"
            required
          ></v-text-field>
        </v-col>
        <v-btn
            color="primary"
            @click="checkAvailability()"
            :disabled="loading"
          >
            Check
          </v-btn>
        </v-form>
      </v-row>
  </v-container>
</template>

<script>
import axios from '../../axios';
import { mapActions } from "vuex";
import { is422 } from '../../helpers/response';

export default {
  props: {
    carId: [String, Number]
  },
  data() {
    return {
      from: null,
      to: null,
      loading: false,
      status: null,
      errors: null
    }
  },
  methods: {
    ...mapActions({
      addFrom: 'booking/addFrom',
      addTo: 'booking/addTo',
    }),
    checkAvailability() {
      this.loading = true;
      this.errors = null;

      axios
      .get(`cars/${this.carId}/availability?from=${this.from}&to=${this.to}`)
      .then((response) => {
        this.status = response.status;
        this.addFrom(this.from);
        this.addTo(this.to);
        this.$emit('availability', this.hasAvailability);
      })
      .catch((error) => {
        if (is422(error)) {
          this.errors = error.response.data.errors;
        }
        this.status = error.response.status;
        this.$emit('availability', this.hasAvailability);
      })
      .then(() => {
        this.loading = false;
      })
    },
    errorFor(field) {
      return this.hasErrors && this.errors[field] ? this.errors[field] : null;
    }
  },
  computed: {
    hasErrors() {
      return this.status === 422 && this.errors !== null;
    },
    hasAvailability() {
      return this.status === 200;
    },
    noAvailability() {
      return this.status === 404;
    }
  }
}
</script>