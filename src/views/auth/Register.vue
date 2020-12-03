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
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

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