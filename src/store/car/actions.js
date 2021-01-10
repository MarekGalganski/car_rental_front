import axios from '../../axios';

export default {
  getList(context, pageNumber) {
    return new Promise((resolve, reject) => {
      axios
        .get('cars?page=' + pageNumber)
        .then((response) => {
          context.commit('setCars', response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}