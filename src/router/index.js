import Vue from 'vue'
import VueRouter from 'vue-router'
import afterEach from './afterEach'
import beforeEach from './beforeEach'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/DevTest.vue'),
    meta: { depth01: 'Home', depth02: '', depth03: '' },
    redirect: { name: 'movieSearchDefault' }
  },
  {
    path: '/movieSearch',
    name: 'movieSearchDefault',
    component: () => import('../views/MovieSearch.vue'),
    meta: { depth01: 'movieSearch', depth02: '', depth03: '' }
  },
  {
    path: '/movieSearch/:keyword',
    name: 'movieSearch',
    component: () => import('../views/MovieSearch.vue'),
    meta: { depth01: 'movieSearch', depth02: '', depth03: '' }
  },
  {
    path: '/devTest',
    name: 'devTest',
    component: () => import('../views/DevTest.vue'),
    meta: { depth01: 'devTest', depth02: '', depth03: '' }
  }
]

/* spa 동일라우터 에러 처리 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => (savedPosition ? savedPosition : { x: 0, y: 0 })
})

// 네비게이션가드
router.beforeEach(beforeEach)
router.afterEach(afterEach)

export default router
