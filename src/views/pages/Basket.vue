<template>
  <v-container>
    <v-row v-if="itemsInBasket">
      <v-col
        cols="12"
        sm="8"
        align="center"
        justify="center"
      >
        <v-card width="450">
          <v-card-text>
            <v-form ref="bookingForm">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="First Name"
                    name="first_name"
                    v-model="address.first_name"
                    :rules="requiredRules"
                    type="text"
                    prepend-icon="fas fa-user"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Last Name"
                    name="last_name"
                    v-model="address.last_name"
                    :rules="requiredRules"
                    type="text"
                    prepend-icon="fas fa-user"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="address.email"
                    :rules="emailRules"
                    type="text"
                    prepend-icon="fas fa-envelope-square"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Phone Number"
                    name="phone_number"
                    v-model="address.phone_number"
                    :rules="requiredRules"
                    type="text"
                    prepend-icon="fas fa-mobile-alt"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Address"
                    name="address"
                    v-model="address.street"
                    :rules="requiredRules"
                    type="text"
                    prepend-icon="fas fa-map-marker-alt"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="City"
                    name="city"
                    v-model="address.city"
                    :rules="requiredRules"
                    type="text"
                    prepend-icon="fas fa-city"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Zip Code"
                    name="zip_code"
                    v-model="address.zip"
                    :rules="requiredRules"
                    type="text"
                    prepend-icon="fas fa-mail-bulk"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  @click.prevent="book()"
                >
                  Book Now
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <div style="display: flex;justify-content: space-between">
          <span class="title">
            Your Cart
          </span>
          <span v-if="itemsInBasket" class="title">
            {{ itemsInBasket }}
          </span>
          <span v-else class="title">
            Empty
          </span>
        </div>
        <div v-for="item in basket" :key="item.car.id">
          <v-divider  class="my-2"></v-divider>
          <div style="display: flex;justify-content: space-between">
            <span>
              <router-link
                :to="{name: 'car', params: {id: item.car.id}}"
                style="text-decoration: none;"
              >
                {{ item.car.brand }} {{ item.car.model }}
              </router-link>
            </span>
            <span>
              <span><b>€{{item.price.totalPrice}}</b></span>
            </span>
          </div>
          <div class="mt-1" style="display: flex;justify-content: space-between">
            <span>
              From <b>{{ item.from | dd.mm.yy }}</b>
            </span>
            <span>
              To <b>{{ item.to | dd.mm.yy }}</b>
            </span>
          </div>
          <div class="d-flex align-end flex-column">
            <span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="my-1"
                    fab
                    dark
                    small
                    color="primary"
                    @click="removeFromBasket(item.car.id)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>
                      mdi-trash-can-outline
                    </v-icon>
                  </v-btn>
                  </template>
                <span>Delete from basket</span>
              </v-tooltip>
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row
      v-else
      align="center"
      justify="center"
    >
      <v-col
      cols="12"
      sm="8"
      >
        <v-banner two-line outlined>
          <v-avatar
            slot="icon"
            color="primary accent-4"
            size="40"
          >
            <v-icon
              icon="mdi-lock"
              color="white"
            >
              mdi-cart-outline
            </v-icon>
          </v-avatar>
          <div style="display: flex;justify-content: space-between">
            <div class="headline">
             Your basket is empty.
            </div>
            <div>
            <v-btn
              text
              color="primary accent-4"
              outlined
              class="mx-1"
              :to="{ name: 'cars'}"
            >
              All Cars
            </v-btn>
            <v-btn
              text
              color="primary accent-4"
              outlined
              class="mx-1"
              :to="{ name: 'bookings-list'}"
            >
              Your Bookings
            </v-btn>
            </div>
            </div>
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EmailValidationMixin from '../../mixins/validations/emailValidationMixin.js';
import axios from '../../axios/index';

export default {
  name: 'Basket',
  mixins: [
    EmailValidationMixin,
  ],
  data() {
    return {
      address: {
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        street: null,
        city: null,
        zip: null
      },
      requiredRules: [
        v => !!v || 'This Field is required',
      ],
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      itemsInBasket: 'basket/itemsInBasket',
      basket: 'basket/basket',
      userDetails: 'user/userDetails'
    })
  },
  methods: {
    ...mapActions({
      removeFromBasket: 'basket/removeFromBasket',
      addNotification: 'application/addNotification',
      clearBasket: 'basket/clearBasket'
    }),
    book() {
      if (this.$refs.bookingForm.validate()) {
        this.loading = true;

        axios
          .post('checkout', {
            address: this.address,
            bookings: this.basket.map(basketItem => ({
              car_id: basketItem.car.id,
              from: basketItem.from,
              to: basketItem.to,
              user_id: this.userDetails.id
            }))
          })
          .then(() => {
            this.clearBasket();
            this.addNotification({
              show: true,
              text: 'Booking has been added'
            })
          })
          .catch(() => {
            this.addNotification({
              show: true,
              text: 'Booking has not been added'
            })
          })
      }
    }
  }
}
</script>
