import axios from 'axios';

const state = {
  isLoggedIn: false,
  userDetails: {}
};

const getters = {
  loggedIn(state) {
    return state.isLoggedIn;
  }
};

const mutations = {
  setLoggedIn(state, payload) {
    state.isLoggedIn = payload;
  }
};

const actions = {
  loginUser(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post('http://127.0.0.1:8000/api/login', payload)
        .then((response) => {
          localStorage.setItem('token', response.data);
          context.commit('setLoggedIn', true);
          resolve(response);
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}