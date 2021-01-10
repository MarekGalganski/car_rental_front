<template>
  <v-container class="mb-15 mt-5">
    <v-row justify="center">
      <v-col sm="8" md="5">
        <v-card class="mt-6">
          <v-card-title
            class="primary justify-center headline text-uppercase font-weight-medium"
            style="color: white"
          >
            Register
          </v-card-title>
          <v-card-text>
            <v-form
              ref="registerForm"
              :value="formValid"
            >
              <v-text-field
                label="Email"
                name="email"
                type="text"
                :rules="emailRules"
                v-model="newUser.email"
                prepend-icon="fas fa-envelope-square"
              ></v-text-field>

              <v-text-field
                label="Name"
                name="name"
                type="text"
                :rules="requiredRules"
                v-model="newUser.name"
                prepend-icon="far fa-user"
              ></v-text-field>

              <v-text-field
                label="Password"
                name="password"
                type="password"
                :rules="[...requiredRules, ...passwordRules]"
                v-model="newUser.password"
                prepend-icon="fas fa-lock"
              ></v-text-field>

              <v-text-field
                label="Confirm Password"
                name="password_confirmation"
                type="password"
                :rules="[...requiredRules, ...passwordRules]"
                v-model="newUser.password_confirmation"
                prepend-icon="fas fa-check"
              ></v-text-field>

              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  @click="registerUser()"
                >
                  Register
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import EmailValidationMixin from '../../mixins/validations/emailValidationMixin.js';
import PasswordValidationMixin from '../../mixins/validations/passwordValidationMixin.js';

export default {
  name: 'Register',
  mixins: [
    EmailValidationMixin,
    PasswordValidationMixin
  ],
  data() {
    return {
      formValid: false,
      newUser: {
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification',
      register: 'user/registerUser'
    }),
    registerUser() {
      if (this.$refs.registerForm.validate()) {
        this.register(this.newUser)
          .then((response) => {
            if (response.data && response.data.success) {
              this.addNotification({
                show: true,
                text: 'Success'
              }).then(() => {
                this.$router.push({
                name: 'login'
                });
              });
            }
          })
          .catch(() => {
            this.addNotification({
                show: true,
                text: 'Failed!'
            });
          });
      }
    }
  }
}
</script>