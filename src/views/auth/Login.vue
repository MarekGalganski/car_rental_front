<template>
  <v-container class="mb-15 mt-5">
    <v-row justify="center">
      <v-col sm="8" md="5">
        <v-card class="mt-6">
          <v-card-title
            class="primary justify-center headline text-uppercase font-weight-medium"
            style="color: white"
          >
            Login
          </v-card-title>
          <v-card-text>
            <v-form ref="loginForm">
              <v-text-field
                label="Email"
                name="email"
                type="text"
                :rules="emailRules"
                v-model="user.email"
                prepend-icon="fas fa-envelope-square"
              ></v-text-field>

              <v-text-field
                label="Password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                :rules="requiredRules"
                v-model="user.password"
                prepend-icon="fas fa-lock"
                :append-icon="showPassword ? 'far fa-eye' : 'far fa-eye-slash'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-card-actions>
                <v-btn
                  block
                  color="primary"
                  @click="loginUser()"
                >
                  Login
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
  name: 'Login',
  mixins: [
    EmailValidationMixin,
    PasswordValidationMixin
  ],
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  },
  methods: {
    ...mapActions({
      login: 'user/loginUser',
      addNotification: 'application/addNotification'
    }),
    loginUser() {
      if (this.$refs.loginForm.validate()) {
        this.login(this.user)
          .then(() => {
            this.addNotification({
              show: true,
              text: 'Welcome'
            }).then(() => {
              this.$router.push('cars');
            })
          })
          .catch(() => {
            this.addNotification({
              show: true,
              text: 'Failed to login!'
            })
          })
      }
    }
  }
}
</script>