import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { depth01: 'Home', depth02: '', depth03: '' }
  },
  {
    path: '/aboutMe',
    name: 'aboutMe',
    component: () => import('../views/AboutMe.vue'),
    meta: { depth01: 'AboutMe', depth02: '', depth03: '' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
