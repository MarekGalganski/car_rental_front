import Middlewares from '../../middlewares/';
import AuthLayout from '../../views/layouts/AuthLayout.vue';
import Login from '../../views/auth/Login.vue';
import Register from '../../views/auth/Register.vue';

export default {
  path: '/',
  name: 'auth',
  component: AuthLayout,
  children: [
    {
      path: 'login',
      name: 'login',
      component: Login,
      meta: {
        middleware: [Middlewares.guest]
      }
    },
    {
      path: 'register',
      name: 'register',
      component: Register,
      meta: {
        middleware: [Middlewares.guest]
      }
    },
  ]
}