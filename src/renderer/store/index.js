import Vue from 'vue'
import Vuex from 'vuex'
import Three from '@/assets/api/threeClass'
import github from '@/assets/api/github'

Vue.use(Vuex)

const Grass = {
  namespaced: true,
  state: {
    contributions: ''
  },
  mutations: {
    setContributions (state, data) {
      state.contributions = data
    }
  },
  actions: {
    async getContributions ({commit, state}) {
      commit('setContributions', await github.getContributions('jagpotato'))
    },
    async drawObject ({commit, state, dispatch}) {
      await dispatch('getContributions')
      const three = new Three(state.contributions)
      three.animate()
    }
  }
}

export default new Vuex.Store({
  modules: {
    Grass
  },
  strict: process.env.NODE_ENV !== 'production'
})
