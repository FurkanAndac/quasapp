import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'vacancy', component: () => import('pages/Index.vue') },
      { path: 'interview', component: () => import('pages/Interview.vue') },
      { path: 'profile', component: () => import('pages/Profile.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
