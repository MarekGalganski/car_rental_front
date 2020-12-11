import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import AdminRoutes from './admin/index.js';
import AppRoutes from './app/index.js';
import AuthRoutes from './auth/index.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  AuthRoutes,
  AppRoutes,
  AdminRoutes
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

    nextMiddleware({...context, next: nextMidd});
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
