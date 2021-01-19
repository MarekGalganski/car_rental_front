<template>
  <v-container>
      <div>
        <p class="headline text-uppercase">
          Check Availability
          <span v-if="noAvailability" class="red--text">(NOT AVAILABLE)</span>
          <span v-if="hasAvailability" class="green--text">(AVAILABLE)</span>
        </p>
         <v-form
          ref="availabityForm"
        >
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="from"
              label="Start Date"
              :rules="fromRules"
              type="date"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="to"
              label="End Date"
              :rules="toRules"
              type="date"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
            color="primary"
            @click="checkAvailability()"
            :disabled="loading"
            block
          >
            <span v-if="!loading">Check</span>
            <span v-else>
              <v-progress-circular
                :size="20"
                :width="2"
                indeterminate
                color="primary"
              ></v-progress-circular>
              Checking...
            </span>
          </v-btn>
        </v-form>
      </div>
  </v-container>
</template>

<script>
import axios from '../../axios';
import { mapActions } from "vuex";
import { is422 } from '../../helpers/response';
import DateValidationMixin from '../../mixins/validations/dateValidation.js';

export default {
  props: {
    carId: [String, Number]
  },
  mixins: [
    DateValidationMixin
  ],
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
      addNotification: 'application/addNotification',
    }),
    checkAvailability() {
      if (this.$refs.availabityForm.validate()) {
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
            this.addNotification({
              show: true,
              text: 'Select correct dates.'
            })
          }
          this.status = error.response.status;
          this.$emit('availability', this.hasAvailability);
        })
        .then(() => {
          this.loading = false;
        })
      }
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