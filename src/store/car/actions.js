import axios from '../../axios';

export default {
  getList(context, pageNumber) {
    axios
      .get('cars?page=' + pageNumber)
      .then((response) => {
        context.commit('setCars', response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}