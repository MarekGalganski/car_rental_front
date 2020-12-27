export default {
  addFrom(context, payload) {
    return new Promise((resolve) => {
      context.commit('addFrom', payload);
      resolve(true);
    });
  },
  addTo(context, payload) {
    return new Promise((resolve) => {
      context.commit('addTo', payload);
      resolve(true);
    });
  }
}