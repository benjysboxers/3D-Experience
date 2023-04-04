/* imports Three.js library and makes it availabe in curreny file
under the name `Three` */
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 1.0, 30000);
camera.position.set(-900, -200, -900);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', renderer);
controls.minDistance = 500;
controls.maxDistance = 1500;

//initialize an array and load our texturized images
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load('./divine_ft.jpg');
let texture_bk = new THREE.TextureLoader().load('./divine_bk.jpg');
let texture_up = new THREE.TextureLoader().load('./divine_up.jpg');
let texture_dn = new THREE.TextureLoader().load('./divine_dn.jpg');
let texture_rt = new THREE.TextureLoader().load('./divine_rt.jpg');
let texture_lf = new THREE.TextureLoader().load('./divine_lf.jpg');

/* push each material to the array */
materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

for(let i=0;i<6;i++)
materialArray[i].side = THREE.BackSide;

//BoxGeometry for a rectangular cubiod with a given 'width', 'height', and 'depth'
let skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
let skybox = new THREE.Mesh(skyboxGeometry, materialArray);
scene.add(skybox);

function animate(){
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();