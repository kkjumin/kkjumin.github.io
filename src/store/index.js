import Vue from 'vue'
import Vuex from 'vuex'
import {
  DISPATCH_SEARCH_MOV,
  DISPATCH_TODAY_BOX_OFFICE,
  SET_BOX_OFFICE,
  SET_BOX_OFFICE_SETTING_POPUP,
  SET_IS_LOADING,
  SET_MENU_TOGGLE,
  SET_MOVIES,
  SET_NATION_CODE
} from './types'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideMenuShow: false,
    movies: {},
    isLoading: false,
    display: 12,

    // 박스오피스관련
    boxOffice: {},
    boxOfficeSettingPopup: false,
    repNationCd: ''
  },
  getters: {},
  mutations: {
    [SET_MENU_TOGGLE](state, payload) {
      state.sideMenuShow = payload
    },
    [SET_MOVIES](state, payload) {
      state.movies = payload
    },
    [SET_BOX_OFFICE](state, payload) {
      state.boxOffice = payload
    },
    [SET_IS_LOADING](state, payload) {
      state.isLoading = payload
    },
    [SET_BOX_OFFICE_SETTING_POPUP](state, payload) {
      state.boxOfficeSettingPopup = payload
    },
    [SET_NATION_CODE](state, payload) {
      state.repNationCd = payload
    }
  },
  actions: {
    // eslint-disable-next-line no-empty-pattern
    [DISPATCH_SEARCH_MOV]: async ({ commit, state }, payload) => {
      commit(SET_IS_LOADING, true)
      let mov
      const url = '/api/search'
      const { query, start, genre, country, yearform, yearto } = payload
      const { display } = state
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
    },

    [DISPATCH_TODAY_BOX_OFFICE]: async ({ commit, state }, payload) => {
      commit(SET_IS_LOADING, true)
      let boxOffice
      const url = '/api/boxOffice'
      const { repNationCd } = state
      const { targetDt } = payload

      try {
        const { data } = await axios.get(url, {
          params: { targetDt, itemPerPage: '10', multiMovieYn: 'N', repNationCd }
        })
        boxOffice = data.boxOfficeResult
        commit(SET_BOX_OFFICE, boxOffice)
      } catch (error) {
        console.log(error)
      } finally {
        commit(SET_IS_LOADING, false)
      }
      return boxOffice
    }
  },
  modules: {}
})
