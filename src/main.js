import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import { getScrollEvent } from './mixins'

Vue.config.productionTip = false
Vue.use(VueLodash, { name: 'custom', lodash: lodash })

Vue.mixin(getScrollEvent)
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
