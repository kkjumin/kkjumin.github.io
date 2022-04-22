import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import { getScrollEvent, goTo } from './mixins'
import moment from 'moment'
import vueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VueLodash, { name: 'custom', lodash: lodash })
Vue.use(moment)
Vue.use(vueMoment)

Vue.mixin(getScrollEvent)
Vue.mixin(goTo)
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
