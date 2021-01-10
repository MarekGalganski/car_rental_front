export default {
    data() {
      return {
        fromRules: [
          v => !!v || 'Start Date is required',
          v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Not correct date format',
        ],
        toRules: [
          v => !!v || 'End Date is required',
          v => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'Not correct date format',
        ],
      }
    }
  }