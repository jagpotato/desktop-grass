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
      state.camera.position.set(0, -110, 80)
      state.camera.rotation.x = Math.PI / 3
    },
    initRenderer (state) {
      state.renderer = new THREE.WebGLRenderer({alpha: true})
      state.renderer.setSize(state.width, state.height)
      state.renderer.setClearColor(0x00ff00, 0.5)
      document.getElementById('grass').appendChild(state.renderer.domElement)
    },
    initLight (state) {
      const directionalLight = new THREE.DirectionalLight(0xffffff)
      directionalLight.position.set(1, 1, 1)
      state.scene.add(directionalLight)
      const ambient = new THREE.AmbientLight(0x999999)
      state.scene.add(ambient)
    },
    initBox (state) {
      let geometry = new THREE.BoxGeometry(10, 10, 10)
      let material = new THREE.MeshPhongMaterial({color: 0xff0000})
      state.box = new THREE.Mesh(geometry, material)
      state.box.position.set(0, 0, 50)
      state.scene.add(state.box)
      geometry = new THREE.PlaneGeometry(100, 100, 32)
      material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide})
      const plane = new THREE.Mesh(geometry, material)
      plane.position.set(0, 0, 0)
      state.scene.add(plane)
      geometry = new THREE.Geometry()
      const sphereTemp = new THREE.Mesh(
        new THREE.SphereGeometry(5, 5, 5)
      )
      for (let i = 0; i < 10; i++) {
        sphereTemp.position.set(i * 10, 0, 25)
        geometry.mergeMesh(sphereTemp)
      }
      material = new THREE.MeshPhongMaterial()
      const sphere = new THREE.Mesh(geometry, material)
      state.scene.add(sphere)
    },
    render (state) {
      state.box.rotation.x += 0.02
      state.box.rotation.y += 0.02
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
