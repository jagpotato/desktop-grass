import * as THREE from 'three'

export default class {
  constructor () {
    this.scene = new THREE.Scene()
    const width = 600
    const height = 400
    const fov = 60
    const aspect = width / height
    const near = 1
    const far = 1000
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(0, -110, 80)
    this.camera.rotation.x = Math.PI / 3
    this.renderer = new THREE.WebGLRenderer({alpha: true})
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x00ff00, 0.5)
    document.getElementById('grass').appendChild(this.renderer.domElement)
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(directionalLight)
    const ambient = new THREE.AmbientLight(0x999999)
    this.scene.add(ambient)

    let geometry = new THREE.BoxGeometry(10, 10, 10)
    let material = new THREE.MeshPhongMaterial({color: 0xff0000})
    this.box = new THREE.Mesh(geometry, material)
    this.box.position.set(0, 0, 50)
    this.scene.add(this.box)

    geometry = new THREE.PlaneGeometry(100, 100, 32)
    material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide})
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(0, 0, 0)
    this.scene.add(plane)

    geometry = new THREE.SphereGeometry(5, 100, 100)
    let sphere
    for (let i = 0; i < 380; i++) {
      material = new THREE.MeshPhongMaterial()
      sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(i * 10, 0, 25)
      this.scene.add(sphere)
    }
  }
  animate () {
    requestAnimationFrame(this.animate.bind(this))
    this.box.rotation.x += 0.05
    this.box.rotation.y += 0.05
    this.renderer.render(this.scene, this.camera)
  }
}
