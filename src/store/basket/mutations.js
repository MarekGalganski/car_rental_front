export default {
  addToBasket(state, payload) {
    state.items.push(payload);
  },
  removeFromBasket(state, payload) {
    state.items = state.items.filter(item => item.car.id !== payload);
  }
}