import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }, {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  }, {
    path: '/control',
    name: 'Control',
    component: () => import('../views/Control.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
