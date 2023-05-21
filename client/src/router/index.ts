import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },{
      path: '/OrderView.vue',
      name: 'Order',
      component: () => import('../views/OrderView.vue')
    },{
      path: '/TrackOrderView.vue',
      name: 'Track-Order',
      component: () => import('../views/TrackOrderVIew.vue')
    },{
      path: '/AboutView.vue',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },{
      path: '/ContactView.vue',
      name: 'Contact',
      component: () => import('../views/ContactView.vue')
    },{
      path: '/SignInView.vue',
      name: 'Sign-In',
      component: () => import('../views/SignInView.vue')
    }
  ]
})

export default router
