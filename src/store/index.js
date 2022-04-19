import Vue from 'vue'
import Vuex from 'vuex'
import { DEPATCH_SEARCH_MOV, SET_MENU_TOGGLE } from './types'
import axios from 'axios'

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
  actions: {
    // eslint-disable-next-line no-empty-pattern
    [DEPATCH_SEARCH_MOV]: async ({}, payload) => {
      let mov
      let clientId = 'kn4BNyrP3T3hPcYD6Lol'
      let clientSecret = 'CkOSU7_WIz'
      let headers = {
        'X-Naver-Client-Id': clientId,
        'X-Naver-Client-Secret': clientSecret
      }
      const url = '/api/v1/search/movie.json'
      const { query } = payload
      try {
        const result = await axios.get(url, { params: { query }, headers })
        mov = result
      } catch (error) {
        console.log(error)
      }
      return mov
    }
  },
  modules: {}
})
