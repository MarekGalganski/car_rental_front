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
      context.commit('setUserDetails', '');
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
          context.commit('setUserDetails', response.data);
          sessionStorage.setItem('userId', response.data.id)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  changePassword(context, payload) {
    return new Promise((resolve, reject) => {
      axios
          .put('change-password', payload)
          .then((response) => {
            if (response.data.status) {
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
    });
  },
  updateDetails(context, payload) {
    return new Promise((resolve, reject) => {
      axios
          .put('change-details', payload)
          .then((response) => {
            if (response.data.success) {
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
    });
  }
};