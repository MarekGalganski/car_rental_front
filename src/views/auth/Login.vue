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
        LOG IN
      </v-banner>
      <v-spacer></v-spacer>
        <v-form
          ref="loginForm"
        >
          <v-text-field
            v-model="user.email"
            label="Email"
            name="email"
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Password"
            name="password"
            type="password"
          ></v-text-field>

          <v-btn
            color="primary"
            @click="loginUser()"
          >
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser() {
      if (this.$refs.loginForm.validate()) {
        axios
          .post('http://127.0.0.1:8000/api/login', this.user)
          .then((response) => {
            console.log(response.data);
          })
      }
    }
  }
}
</script>