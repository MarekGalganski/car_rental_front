import Vue from 'vue';
import Vuex from 'vuex';

import user from './user/index';
import application from './application/index';
import booking from './booking/index';
import basket from './basket/index';
import car from './car/index';
import review from './review/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    application,
    booking,
    basket,
    car,
    review
  }
})
