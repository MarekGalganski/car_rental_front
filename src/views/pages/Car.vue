<template>
  <v-container>
    <div v-if="loading">
      <loading></loading>
    </div>
    <div v-else>
      <v-row>
        <v-col
          cols="12"
          md="8"
          align="center"
        >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              class="mx-auto"
              outlined
              :elevation="hover ? 20 : 6"
            >
              <v-card-text>
                <div>
                    {{ car.brand }}
                </div>
                <p class="headline text--primary">
                    {{ car.model }}
                </p>
                <hr />
                <br />
                <div class="text--primary">
                  {{ car.description }}
                </div>
                <br />
                <hr />
                <br />
                <p class="headline text--primary">
                  € {{ car.price }}
                </p>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <div class="my-8" >
          <review-list :car-id="this.$route.params.id"></review-list>
        </div>
        </v-col>
        <v-col
          cols="12"
          md="4"
          align="center"
          justify="center"
          class="mb-12"
        >
          <availability
            :car-id="this.$route.params.id"
            @availability="checkPrice($event)"
          ></availability>
          <div
            class="px-3 py-3"
            v-if="price"
          >
            <price-breakdown :price="price"></price-breakdown>
            <v-btn
              block
              outlined
              color="primary"
              @click="addItemToBasket()"
              :disabled="inBasketAlready"
            >
              Book now
            </v-btn>
          </div>
          <div
            v-if="inBasketAlready"
            class="px-3 py-3"
          >
            <v-btn
              block
              outlined
              color="primary"
              @click="removeItemFromBasket()"
            >
              Remove from basket
            </v-btn>
            <span class="caption float-left">
              You've added this car to basket already.
            </span>
            <span class="caption float-left">
              If you want to change dates, remove from basket first.
            </span>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from '../../axios';
import { mapGetters, mapActions } from "vuex";

import Availability from '../../components/cars/Availlability';
import ReviewList from '../../components/cars/ReviewList';
import PriceBreakdown from '../../components/cars/PriceBreakdown';
import Loading from '../../components/shared/Loading';

export default {
  name: 'Car',
  components: {
    Availability,
    ReviewList,
    Loading,
    PriceBreakdown
  },
  data() {
    return {
      car: null,
      loading: false,
      price: null
    }
  },
  computed: {
    ...mapGetters({
      from: 'booking/from',
      to: 'booking/to',
    }),
    inBasketAlready() {
      if (this.car === null) {
        return false;
      }

      return this.$store.getters['basket/inBasketAlready'](this.car.id);
    }
  },
  created() {
    this.loading = true;

    axios.get(`cars/${this.$route.params.id}`)
      .then((response) => {
        this.car = response.data;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      })
  },
  methods: {
    ...mapActions({
      addToBasket: 'basket/addToBasket',
      removeFromBasket: 'basket/removeFromBasket'
    }),
    checkPrice(hasAvailability) {
      if (!hasAvailability) {
        this.price = null;
        return;
      }

      axios.get(`cars/${this.$route.params.id}/price?from=${this.from}&to=${this.to}`)
        .then((response) => {
          this.price = response.data.data;
        })
        .catch(() => {
          this.price = null;
        })
    },
    addItemToBasket() {
      this.addToBasket({
        car: this.car,
        price: this.price,
        from: this.from,
        to: this.to
      })
    },
    removeItemFromBasket() {
      this.removeFromBasket(this.car.id);
    }
  }
}
</script>