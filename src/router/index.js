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
  },
  {
    path: '/world-population-multiple-years',
    name: 'world-population-multiple-years',
    component: () => import('../views/WorldPopulationMultipleYears')
  },
  {
    path: '/simple-time-scale',
    name: 'simple-time-scale',
    component: () => import('../views/SimpleTimeScale')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
