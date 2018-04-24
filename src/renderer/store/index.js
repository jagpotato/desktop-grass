import Vue from 'vue'
import Vuex from 'vuex'
import Three from '@/assets/api/threeClass'

Vue.use(Vuex)

const Grass = {
  namespaced: true,
  state: {},
  mutations: {
  },
  actions: {
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
