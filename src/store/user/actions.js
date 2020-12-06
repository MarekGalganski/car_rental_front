import axios from '../../axios';

export default {
  registerUser(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('register', payload)
        .then((response) => {
          if (response.data) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  loginUser(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('login', payload)
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            context.commit('setLoggedIn', true);
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch((error) => {
          reject(error);
        })
    })
  },
  logoutUser(context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token');
      context.commit('setLoggedIn', false);
      resolve(true);
    })
  },
  setLoggedInState(context) {
    return new Promise((resolve) => {
      if (localStorage.getItem('token')) {
        context.commit('setLoggedIn', true);
      } else {
        context.commit('setLoggedIn', false);
      }
      resolve(true);
    });
  },
  setUserDetailsState(context) {
    return new Promise((resolve, reject) => {
      axios
        .get('user-details')
        .then((response) => {
          context.commit('setUserDetails', response.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};