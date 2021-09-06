import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }, {
    path: '/config',
    name: 'Config',
    component: () => import('../views/Config.vue')
  }, {
    path: '/json',
    name: 'Json',
    component: () => import('../views/Json.vue')
  }, {
    path: '/display',
    name: 'Display',
    component: () => import('../views/Display.vue')
  }, {
    path: '/*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
