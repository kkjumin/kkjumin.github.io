import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { depth01: 'Home', depth02: '', depth03: '' },
    redirect: { name: 'movieSearch' }
  },
  {
    path: '/movieSearch',
    name: 'movieSearch',
    component: () => import('../views/MovieSearch.vue'),
    meta: { depth01: 'AboutMe', depth02: '', depth03: '' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
