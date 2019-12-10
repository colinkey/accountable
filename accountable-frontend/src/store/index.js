import Vue from 'vue'
import Vuex from 'vuex'

import { apiRequest } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activityCategories: [],
    user: null
  },
  mutations: {
    setActivityCategories(state, categories) {
      state.activityCategories = categories
    },
    setUser(state, user) {
      state.user = user
    }
  },
  getters: {
    currentUser: (state) => {
      return state.user
    }
  },
  actions: {
    loadApp(context) {
      apiRequest('GET', '/app', null, false).then(data => {
        const { activityCategories } = data
        context.commit('setActivityCategories', activityCategories)
      }).catch(error => {
        /* eslint-disable no-console */
        console.log(error)
      })
    },
  },
})
