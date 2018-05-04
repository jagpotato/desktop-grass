import * as THREE from 'three'

export default class {
  constructor (contributions) {
    // Scene
    this.scene = new THREE.Scene()
    // Camera
    const width = 600
    const height = 400
    const near = 1
    const far = 1000
    // Orthographic
    this.camera = new THREE.OrthographicCamera(-150, +150, 100, -100, near, far)
    this.camera.up = new THREE.Vector3(0, 0, 1)
    this.camera.position.set(290, -100, 90)
    this.camera.lookAt(new THREE.Vector3(160, 0, 0))
    // Perspective
    /*
    const fov = 60
    const aspect = width / height
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    // 真上から
    // this.camera.position.set(180, 0, 250)
    // 斜めから1
    // this.camera.position.set(180, -200, 180)
    // this.camera.rotation.x = Math.PI / 3
    // 斜めから2
    this.camera.position.set(350, -150, 100)
    this.camera.rotation.x = Math.PI / 3
    this.camera.rotation.y = Math.PI / 4
    */
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
    let grassBox
    for (let i = 0; i < contributions.length; i++) {
      geometry = new THREE.BoxGeometry(5, 5, contributions[i].count * 2)
      material = new THREE.MeshPhongMaterial({color: parseInt('0x' + contributions[i].color.substr(1, 6), 16)})
      grassBox = new THREE.Mesh(geometry, material)
      grassBox.position.set(Math.floor(i / 7) * 7, -(i % 7) * 7, contributions[i].count * 2 / 2)
      this.scene.add(grassBox)
    }
    // Cone
    /*
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
    */
    // grass
    // const grassWidth = 5
    // const grassHeight = 50
    // const grassSlope = 2
    // const left = new THREE.QuadraticBezierCurve3(
    //   new THREE.Vector3(0, 0, 0),
    //   new THREE.Vector3(grassSlope, 0, grassHeight / 2),
    //   new THREE.Vector3(grassWidth + grassSlope, 0, grassHeight)
    // )
    // const right = new THREE.QuadraticBezierCurve3(
    //   new THREE.Vector3(grassWidth + grassSlope, 0, grassHeight),
    //   new THREE.Vector3(grassWidth + grassSlope / 2, 0, grassHeight / 2),
    //   new THREE.Vector3(grassWidth, 0, 0)
    // )
    // const leftPoints = left.getPoints(50)
    // const rightPoints = right.getPoints(50)
    // rightPoints.shift()
    // const points = leftPoints.concat(rightPoints)
    // const triangleNum = points.length - 2
    // let indices = []
    // for (let i = 0; i < triangleNum; i++) {
    //   indices.push(0)
    //   indices.push(i + 1)
    //   indices.push(i + 2)
    // }
    // indices = new Uint16Array(indices)
    // let mesh
    // for (let i = 0; i < contributions.length; i++) {
    //   geometry = new THREE.BufferGeometry().setFromPoints(points)
    //   geometry.setIndex(new THREE.BufferAttribute(indices, 1))
    //   material = new THREE.MeshBasicMaterial({color: parseInt('0x' + contributions[i].color.substr(1, 6), 16), side: THREE.DoubleSide})
    //   mesh = new THREE.Mesh(geometry, material)
    //   mesh.position.set(Math.floor(i / 7) * 7, -(i % 7) * 7, contributions[i].count * 2 / 2)
    //   this.scene.add(mesh)
    // }
  }
  animate () {
    requestAnimationFrame(this.animate.bind(this))
    this.box.rotation.x += 0.05
    this.box.rotation.y += 0.05
    this.renderer.render(this.scene, this.camera)
  }
}
