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
    drawObject ({commit, state}) {
      const three = new Three()
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
