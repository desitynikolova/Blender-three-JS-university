import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xC3EBF2);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight);
camera.position.set(0, 3, 15);

const loader = new GLTFLoader();
loader.load('cat.glb', function (gltf) {
    scene.add(gltf.scene);
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());

    gltf.scene.position.x += (gltf.scene.position.x - center.x);
    gltf.scene.position.y += (gltf.scene.position.y - center.y);
    gltf.scene.position.z += (gltf.scene.position.z - center.z);
})

const light1 = new THREE.PointLight(0xffffff, 100, 100);
light1.position.set(4, 1, 2);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 100, 100);
light2.position.set(-4, 0, 2);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 25, 50);
light3.position.set(0, 7, 2);
scene.add(light3);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const controls = new OrbitControls(camera, canvas);

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

}

animate()