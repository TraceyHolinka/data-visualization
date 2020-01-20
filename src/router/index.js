import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/simple-reactivity',
    name: '/simple-reactivity',
    component: () => import('../views/SimpleReactivity')
  },
  {
    path: '/world-population',
    name: 'world-population',
    component: () => import('../views/WorldPopulation')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
