import Vue from 'vue'
import Vuex from 'vuex'
import { SET_MENU_TOGGLE } from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideMenuShow: false
  },
  getters: {},
  mutations: {
    [SET_MENU_TOGGLE](state, payload) {
      state.sideMenuShow = payload
    }
  },
  actions: {},
  modules: {}
})
