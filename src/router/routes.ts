import { RouteConfig } from 'vue-router'
import Profile from 'pages/Profile.vue'
import Interview from 'pages/Interview.vue'


const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'vacancy', component: () => import('pages/Index.vue') },
      { path: 'interview', component: Interview },
      { path: 'profile', component: Profile }
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
