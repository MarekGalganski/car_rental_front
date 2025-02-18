import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import can from './helpers/can';
import axios from './axios';
import StarRating from './components/shared/StarRating';
import FatalError from './components/shared/FatalError';
import moment from 'moment';
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;

Vue.prototype.$can = can;

Vue.filter('fromNow', value => {
  return moment(value).fromNow();
});

Vue.filter('dd.mm.yy', value => {
  return moment(value).format('DD.MM.YYYY');
});

Vue.filter('dd.mm.yy HH:mm', value => {
  return moment(value).format('DD.MM.YYYY HH:mm');
});

Vue.component('star-rating', StarRating);
Vue.component('fatal-error', FatalError);

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
