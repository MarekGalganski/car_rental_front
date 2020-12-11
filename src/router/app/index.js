import Middlewares from '../../middlewares/';
import AppLayout from '../../views/layouts/AppLayout.vue';
import Dashboard from '../../views/pages/Dashboard.vue';
import Profile from '../../views/pages/Profile.vue';

export default {
  path: '/',
  name: 'app',
  component: AppLayout,
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        middleware: [Middlewares.auth, Middlewares.checkPermissions],
        permissions: ['view-developer-dashboard']
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        middleware: [Middlewares.auth]
      }
    }
  ]
}