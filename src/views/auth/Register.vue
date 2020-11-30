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
            v-model="newUser.email"
            label="Email"
            name="email"
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="newUser.name"
            label="Name"
            name="name"
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="newUser.password"
            label="Password"
            name="password"
            type="password"
          ></v-text-field>

          <v-text-field
            v-model="newUser.password_confirmation"
            label="Confirm Password"
            name="password_confirmation"
            type="password"
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
    <v-snackbar
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>

    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      formValid: false,
      newUser: {
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
      },
      snackbar: {
        show: false,
        text: 'Success'
      }
    }
  },
  methods: {
    registerUser() {
      if (this.$refs.registerForm.validate()) {
        axios
          .post('http://127.0.0.1:8000/api/register', this.newUser)
          .then((response) => {
            if (response.data && response.data.success) {
              this.snackbar = {
                show: true,
                text: 'Success'
              };

              this.$router.push({
                name: 'login'
              });
            }
          })
          .catch(() => {
            this.snackbar = {
              show: true,
              text: 'Failed!!'
            }
          })
      }
    }
  }
}
</script>