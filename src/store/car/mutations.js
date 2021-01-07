export default {
  setCars(state, payload) {
    state.cars = payload;
  },
  setCurrentPage(state, payload) {
    state.cars.current_page = payload;
  }
}