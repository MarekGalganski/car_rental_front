<template>
  <v-container fluid class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="4"
        sm="8"
      >
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Details</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <p><strong>Name:</strong> {{userDetails.name}} </p>
            <p><strong>Email:</strong> {{userDetails.email}} </p>
            <p><strong>Joined:</strong> {{userDetails.created_at}} </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="4"
        sm="8"
      >
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Change Details</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="changeDetailsForm">
              <v-text-field
                name="name"
                label="Name"
                type="text"
                :rules="requiredRules"
                v-model="userDetails.name"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="changeDetails">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
      class="mb-12"
    >
      <v-col
        cols="12"
        md="4"
        sm="8"
      >
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Change Password</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="changePasswordForm">
              <v-text-field
                name="oldPassword"
                label="Old Password"
                type="password"
                :rules="[...requiredRules, ...passwordRules]"
                v-model="user.oldPassword"
              ></v-text-field>
              <v-text-field
                name="newPassword"
                label="New Password"
                type="password"
                :rules="[...requiredRules, ...passwordRules]"
                v-model="user.newPassword"
              ></v-text-field>
              <v-text-field
                name="newPasswordConfirmation"
                label="New Password Confirmation"
                type="password"
                :rules="[...requiredRules, ...passwordRules, newPasswordConfirmationValidator]"
                v-model="user.newPassword_confirmation"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="changePassword">Change Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PasswordValidationMixin from '../../mixins/validations/passwordValidationMixin.js';

export default {
  mixins: [PasswordValidationMixin],
  data() {
    return {
      user: {
        oldPassword: '',
        newPassword: '',
        newPassword_confirmation: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      userDetails: 'user/userDetails',
    })
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification',
      changeUserPassword: 'user/changePassword',
      updateDetails: 'user/updateDetails'
    }),
    changeDetails() {
      if (!this.$refs.changeDetailsForm.validate()) {
        return false;
      }

      this.updateDetails(this.userDetails)
        .then(() => {
          this.addNotification({
            show: true,
            text: 'Details changed'
          })
        }).catch(() => {
          this.addNotification({
            show: true,
            text: 'Failed to change details!'
          })
        });
    },
    changePassword() {
      if (!this.$refs.changePasswordForm.validate()) {
        return false;
      }

      this.changeUserPassword(this.user)
        .then(() => {
          this.addNotification({
            show: true,
            text: 'Password changed'
          })
        }).catch(() => {
          this.addNotification({
            show: true,
            text: 'Failed to change password!'
          })
        });
    },
    newPasswordConfirmationValidator() {
      return (this.user.newPassword_confirmation == this.user.newPassword) || 'New password is not confirmed';
    }
  }
}
</script>