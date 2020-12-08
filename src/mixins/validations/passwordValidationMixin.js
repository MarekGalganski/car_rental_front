export default {
  data() {
    return {
      requiredRules: [
        v => !!v || 'This field is required',
      ],
      passwordRules: [
        v => (!!v && v.length > 6) || 'Password is too short',
      ]
    }
  }
}