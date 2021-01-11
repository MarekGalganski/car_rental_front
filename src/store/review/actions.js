import axios from '../../axios';

export default {
  getList(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .get('cars/' + payload.carId + '/reviews?page=' + payload.pageNumber)
        .then((response) => {
          context.commit('setReviews', response.data);
          context.commit('setCurrentCarId', payload.carId);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}