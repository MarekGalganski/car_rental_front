export default {
  data() {
    return {
      emailRules: [
        v => !!v || 'The Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }
  }
}