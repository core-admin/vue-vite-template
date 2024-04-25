import { RouteRecordRaw } from 'vue-router';

export const exampleRoutes: RouteRecordRaw[] = [
  {
    path: '/example-BackEndRequest',
    name: 'BackEndRequest',
    component: () => import('/examples/obs/BackEndRequest.vue'),
  },
  {
    path: '/example-usePage',
    name: 'usePage',
    component: () => import('/examples/hooks/usePage/index.vue'),
  },
  {
    path: '/zip',
    name: 'Zip',
    component: () => import('/examples/views/zip/index.vue'),
  },
];
