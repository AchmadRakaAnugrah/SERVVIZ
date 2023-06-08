import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/UserHomeView.vue'
import AdminView from '../views/AdminSignInView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: UserView
    },

    // {
    //   path: '/admin',
    //   name: 'admin',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AdminSignInView.vue')
    // }
    {
      path: '/admin',
      name: 'signin',
      component: AdminView
    },
    {
      path: '/admin/signup',
      name: 'signup',
      component: () => import('../views/AdminSignUpView.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('../views/AdminDashboardView.vue')
    }
  ]
})

export default router
