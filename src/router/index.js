import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import Profile from '../views/pages/Profile.vue'

import AuthLayout from '../views/layouts/AuthLayout.vue'
import AppLayout from '../views/layouts/AppLayout.vue'

import Middlewares from '../middlewares/';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
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
  },
  {
    path: '/',
    name: 'app',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          middleware: [Middlewares.auth]
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
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) return context.next;

  return (...paremeters) => {
    context.next(...paremeters);
    const nextMidd = nextCheck(context, middleware, index + 1);

    nextMiddleware({context, next: nextMidd});
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to
    };

    const nextMiddleware = nextCheck(context, middleware, 1);

    return middleware[0]({...context, next: nextMiddleware});
  }

  return next();
})


export default router
