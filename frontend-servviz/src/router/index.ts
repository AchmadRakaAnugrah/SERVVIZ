import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/UserHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/admin/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdminSignInView.vue')
    }
  ]
})

export default router
