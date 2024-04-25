import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import { exampleRoutes } from './example';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/Login.vue'),
  // },
  // {
  //   path: '/token-test',
  //   name: 'TokenTest',
  //   component: () => import('@/views/TokenTest.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...exampleRoutes],
});

export { router, routes };
