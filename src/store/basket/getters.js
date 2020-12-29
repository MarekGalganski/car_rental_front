export default {
	itemsInBasket(state) {
		return state.items.length;
  },
  inBasketAlready(state) {
    return function(id) {
      return state.items.reduce(
        (result, item) => result || item.car.id === id,
        false
      );
    }
  },
  basket(state) {
    return state.items;
  }
}