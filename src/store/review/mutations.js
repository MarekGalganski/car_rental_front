export default {
  setReviews(state, payload) {
    state.reviews = payload;
  },
  setCurrentPage(state, payload) {
    state.reviews.current_page = payload;
  },
  setCurrentCarId(state, payload) {
    state.carId = payload;
  }
}