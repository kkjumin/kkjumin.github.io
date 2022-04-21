import Vue from 'vue'
import Vuex from 'vuex'
import { DEPATCH_SEARCH_MOV, SET_IS_LOADING, SET_MENU_TOGGLE, SET_MOVIES } from './types'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideMenuShow: false,
    movies: {},
    isLoading: false
  },
  getters: {},
  mutations: {
    [SET_MENU_TOGGLE](state, payload) {
      state.sideMenuShow = payload
    },
    [SET_MOVIES](state, payload) {
      state.movies = payload
    },
    [SET_IS_LOADING](state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    [DEPATCH_SEARCH_MOV]: async ({ commit }, payload) => {
      commit(SET_IS_LOADING, true)
      let mov
      const url = '/api/search'
      const { query, display, start, genre, country, yearform, yearto } = payload
      try {
        const { data } = await axios.get(url, {
          params: { query, display, start, genre, country, yearform, yearto }
        })
        mov = data
        commit(SET_MOVIES, mov)
      } catch (error) {
        console.log(error)
      } finally {
        commit(SET_IS_LOADING, false)
      }
      return mov
    }
  },
  modules: {}
})
