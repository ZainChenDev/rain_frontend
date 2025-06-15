import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    }
  ]
})

export default router
