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
  {
    path: '/mouse-event',
    name: 'MouseEvent',
    component: () => import('/examples/dom/MouseEvent.vue'),
  },
];
// https://juejin.cn/post/7204635326559158330#heading-3
