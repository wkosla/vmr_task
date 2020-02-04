import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users.vue'),
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/User.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
