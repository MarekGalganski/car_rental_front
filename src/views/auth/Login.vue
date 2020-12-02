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
import { mapActions } from 'vuex';

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
              this.$router.push('dashboard');
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