import Vue from 'vue'
import Vuex from 'vuex'
import * as THREE from 'three'
import github from '@/assets/api/github'

Vue.use(Vuex)

const Grass = {
  namespaced: true,
  state: {
    contributions: [],
    width: 600,
    height: 300,
    scene: '',
    camera: '',
    renderer: '',
    directionalLight: '',
    box: ''
  },
  mutations: {
    setContributions (state, data) {
      state.contributions = data
    },
    initScene (state) {
      state.scene = new THREE.Scene()
    },
    initCamera (state) {
      const fov = 60
      const aspect = state.width / state.height
      const near = 1
      const far = 1000
      state.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      state.camera.position.set(0, 0, 50)
    },
    initRenderer (state) {
      state.renderer = new THREE.WebGLRenderer()
      state.renderer.setSize(state.width, state.height)
      state.renderer.setClearColor(0xefefef)
      document.getElementById('grass').appendChild(state.renderer.domElement)
    },
    initLight (state) {
      state.directionalLight = new THREE.DirectionalLight(0xffffff)
      state.directionalLight.position.set(1, 1, 1)
      state.scene.add(state.directionalLight)
      const ambient = new THREE.AmbientLight(0x999999)
      state.scene.add(ambient)
    },
    initBox (state) {
      const geometry = new THREE.BoxGeometry(10, 10, 10)
      const material = new THREE.MeshPhongMaterial({color: 0x00ff00})
      state.box = new THREE.Mesh(geometry, material)
      state.box.position.set(0, 0, 0)
      state.scene.add(state.box)
    },
    render (state) {
      state.box.rotation.x += 0.01
      state.box.rotation.y += 0.01
      state.renderer.render(state.scene, state.camera)
    }
  },
  actions: {
    async getContributions ({commit, state}) {
      commit('setContributions', await github.getContributions('jagpotato'))
    },
    initScene ({commit, state}) {
      commit('initScene')
      commit('initCamera')
      commit('initLight')
      commit('initBox')
    },
    initRenderer ({commit, state}) {
      commit('initRenderer')
    },
    render ({commit, state}) {
      const animate = () => {
        requestAnimationFrame(animate)
        commit('render')
      }
      animate()
    }
  }
}

export default new Vuex.Store({
  modules: {
    Grass
  },
  strict: process.env.NODE_ENV !== 'production'
})
