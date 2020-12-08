<template>
  <v-container>
    <v-row
      justify="center"
    >
      <v-col
        md="6"
      >
      <v-banner
        elevation="7"
        single-line
        sticky
        align="center"
      >
        REGISTER
      </v-banner>
      <v-spacer></v-spacer>
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
          ></v-text-field>

          <v-text-field
            label="Name"
            name="name"
            type="text"
            :rules="requiredRules"
            v-model="newUser.name"
          ></v-text-field>

          <v-text-field
            label="Password"
            name="password"
            type="password"
            :rules="[...requiredRules, ...passwordRules]"
            v-model="newUser.password"
          ></v-text-field>

          <v-text-field
            label="Confirm Password"
            name="password_confirmation"
            type="password"
            :rules="[...requiredRules, ...passwordRules]"
            v-model="newUser.password_confirmation"
          ></v-text-field>

          <v-btn
            color="primary"
            @click="registerUser()"
          >
            Register
          </v-btn>
        </v-form>
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