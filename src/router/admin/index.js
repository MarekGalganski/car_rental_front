import Middlewares from '../../middlewares/';
import AdminLayout from '../../views/layouts/AdminLayout.vue';
import AdminDashboard from '../../views/admin/Dashboard.vue';

export default {
  path: '/admin/',
  name: 'app',
  component: AdminLayout,
  children: [
    {
      path: 'dashboard',
      name: 'adminDashboard',
      component: AdminDashboard,
      meta: {
        middleware: [Middlewares.auth, Middlewares.checkPermissions],
        permissions: ['view-developer-dashboard']
      }
    }
  ]
}
