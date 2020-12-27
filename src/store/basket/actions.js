export default {
  addToBasket(context, payload) {
    return new Promise((resolve) => {
      context.commit('addToBasket', payload);
      resolve(true);
    });
  }
}