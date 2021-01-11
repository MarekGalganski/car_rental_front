<template>
  <v-container>
    <div class="text-center" v-if="lastPage">
      <v-pagination
        v-model="currentPage"
        :length="lastPage"
        :total-visible="7"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ['store', 'collection'],
  watch: {
    currentPage(newValue){
      this.paginatePage(newValue);
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state[this.store][this.collection].current_page;
      },
      set(value) {
        this.$store.commit(this.store + '/setCurrentPage', value);
      }
    },
    lastPage: {
      get() {
          return this.$store.state[this.store][this.collection].last_page;
      }
    },
  },
  methods: {
    paginatePage(pageNumber) {
      if (this.store == 'review') {
        let payload = {'carId': this.$store.state.review.carId, 'pageNumber': pageNumber};
        this.$store.dispatch(this.store + '/getList', payload)
      } else {
        this.$store.dispatch(this.store + '/getList', pageNumber)
      }
    }
  }
}
</script>