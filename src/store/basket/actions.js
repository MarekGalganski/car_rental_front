export default {
  addToBasket(context, payload) {
    return new Promise((resolve) => {
      context.commit('addToBasket', payload);
      localStorage.setItem('basket', JSON.stringify(context.state.items));
      resolve(true);
    });
  },
  removeFromBasket(context, payload) {
    return new Promise((resolve) => {
      context.commit('removeFromBasket', payload);
      localStorage.setItem('basket', JSON.stringify(context.state.items));
      resolve(true);
    });
  },
  loadStoredState(context) {
    const basket = localStorage.getItem('basket');
    if (basket) {
      context.commit('setBasket', JSON.parse(basket));
    } else {
      localStorage.setItem('basket', []);
    }
  },
  clearBasket(context) {
    context.commit('setBasket', []);
    localStorage.setItem('basket', JSON.stringify(context.state.items));
  }
}