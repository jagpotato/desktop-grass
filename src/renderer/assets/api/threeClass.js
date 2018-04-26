import * as THREE from 'three'

export default class {
  constructor (contributions) {
    // Scene
    this.scene = new THREE.Scene()
    // Camera
    const width = 600
    const height = 400
    const fov = 60
    const aspect = width / height
    const near = 1
    const far = 1000
    // Perspective
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    // Orthographic
    // this.camera = new THREE.OrthographicCamera(-200, +200, 150, -150, near, far)
    // 真上から
    // this.camera.position.set(180, 0, 250)
    // 斜めから1
    // this.camera.position.set(180, -200, 180)
    // this.camera.rotation.x = Math.PI / 3
    // 斜めから2
    this.camera.position.set(350, -150, 100)
    this.camera.rotation.x = Math.PI / 3
    this.camera.rotation.y = Math.PI / 4
    // Renderer
    this.renderer = new THREE.WebGLRenderer({alpha: true})
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x00ff00, 0.5)
    document.getElementById('grass').appendChild(this.renderer.domElement)
    // Light
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(directionalLight)
    const ambient = new THREE.AmbientLight(0x999999)
    this.scene.add(ambient)
    // Box
    let geometry = new THREE.BoxGeometry(10, 10, 10)
    let material = new THREE.MeshPhongMaterial({color: 0xff0000})
    this.box = new THREE.Mesh(geometry, material)
    this.box.position.set(0, 0, 50)
    this.scene.add(this.box)
    // Plane
    // geometry = new THREE.PlaneGeometry(100, 100, 32)
    // material = new THREE.MeshPhongMaterial({color: 0xffffff, side: THREE.DoubleSide})
    // const plane = new THREE.Mesh(geometry, material)
    // plane.position.set(0, 0, 0)
    // this.scene.add(plane)
    // Box
    // let grassBox
    // for (let i = 0; i < contributions.length; i++) {
    //   geometry = new THREE.BoxGeometry(5, 5, contributions[i].count * 2)
    //   material = new THREE.MeshPhongMaterial({color: parseInt('0x' + contributions[i].color.substr(1, 6), 16)})
    //   grassBox = new THREE.Mesh(geometry, material)
    //   grassBox.position.set(Math.floor(i / 7) * 7, -(i % 7) * 7, contributions[i].count * 2 / 2)
    //   this.scene.add(grassBox)
    // }
    // Cone
    let grassCone
    for (let i = 0; i < contributions.length; i++) {
      geometry = new THREE.ConeGeometry(5, 20, 10, 1, true, 1, 2)
      // geometry = new THREE.ConeGeometry(5, 20, 32)
      material = new THREE.MeshPhongMaterial({color: parseInt('0x' + contributions[i].color.substr(1, 6), 16)})
      grassCone = new THREE.Mesh(geometry, material)
      grassCone.position.set(Math.floor(i / 7) * 7, -(i % 7) * 7, contributions[i].count * 2 / 2)
      grassCone.rotation.x = Math.PI / 2
      this.scene.add(grassCone)
    }
  }
  animate () {
    requestAnimationFrame(this.animate.bind(this))
    this.box.rotation.x += 0.05
    this.box.rotation.y += 0.05
    this.renderer.render(this.scene, this.camera)
  }
}
