import {
  createRouter,
  createWebHistory,
  type RouteComponent,
} from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: (): Promise<RouteComponent> =>
      import('./screens/Home/HomeScreen.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
