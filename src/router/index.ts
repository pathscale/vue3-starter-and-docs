import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Validation from '../views/Validation.vue'
import Home from '../views/Home.vue'
import Router from '../views/Router.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/validation',
    name: 'Validation',
    component: Validation
  },
  {
    path: '/router',
    name: 'Router',
    component: Router
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
