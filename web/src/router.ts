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
  {
    path: '/interview-journeys',
    name: 'interview-journey',
    component: (): Promise<RouteComponent> =>
      import('./screens/InterviewJourneysList/InterviewJourneysList.vue'),
  },
  {
    path: '/interview-journeys/:id',
    name: 'interview-journey-view',
    component: (): Promise<RouteComponent> =>
      import('./screens/InterviewJourneyView/InterviewJourneyView.vue'),
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: (): Promise<RouteComponent> =>
      import('./screens/Analytics/Analytics.vue'),
  },
  {
    path: '/companies',
    name: 'companies',
    component: (): Promise<RouteComponent> =>
      import('./screens/Companies/Companies.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
