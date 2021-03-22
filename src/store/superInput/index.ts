import Vue from 'vue'
import Vuex, { Module } from 'vuex'
import SuperInputService from '@/services/superInput'
import { ISuperInputStore, IData } from '../../types/superInput'

Vue.use(Vuex)

const initState = (): ISuperInputStore => {
  return {
    title: ''
  }
}

const modules: Module<ISuperInputStore, any> = {
  state: initState(),

  getters: {
    /** */
  },

  mutations: {
    setData (state, payload) {
      state.title = payload.title
    }
  },

  actions: {
    async getData ({ commit }) {
      try {
        const data: IData = await SuperInputService.getData()
        commit('setData', data)
      } catch (e) {
        console.log('[store.actions.getData.error]', e)
      }
    }
  }
}

// @ts-ignore
export default new Vuex.Store(modules)
