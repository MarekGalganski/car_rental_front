import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import can from './helpers/can';
import axios from './axios';
import StarRating from './components/shared/StarRating';
import moment from 'moment';
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;

Vue.prototype.$can = can;

Vue.filter('fromNow', value => {
  return moment(value).fromNow();
});

Vue.component('star-rating', StarRating);

let instance = new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: 'fa',
  },
  render: h => h(App)
});

axios.get('constants').then((response) => {
  Vue.prototype.$constants = response.data;

  instance.$mount('#app');
});
