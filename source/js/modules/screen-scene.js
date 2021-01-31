import * as THREE from 'three';
import {setup3d} from "../helpers/3d";
import {screenNames} from "./utils";
const imagesMap = {
  'top': `img/scenes-textures/scene-0.png`,
  'story_0': `img/scenes-textures/scene-1.png`,
  'story_1': `img/scenes-textures/scene-2.png`,
  'story_2': `img/scenes-textures/scene-3.png`,
  'story_3': `img/scenes-textures/scene-4.png`
};
const imageWidth = 2048;
const imageHeight = 1024;
const far = 1000;
const fov = 2 * Math.atan(window.innerHeight / (2 * far)) * 180 / Math.PI;
const {
  renderer,
  scene,
  camera
} = setup3d(far, fov);
const container = document.querySelector(`.animation-screen`);
container.appendChild(renderer.domElement);
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = ``;
const material = new THREE.MeshBasicMaterial();
const geometry = new THREE.PlaneBufferGeometry(imageWidth, imageHeight);
const plane = new THREE.Mesh(geometry, material);

let texture = null;
let currentScreen;
let currentSlideId = 0;

const initScene = () => {
  material.map = texture;
  material.map.needsUpdate = true;
  scene.add(plane);
  camera.position.z = 1000;
  renderer.render(scene, camera);
};

const initScreen = () => {
  if (currentScreen === screenNames.TOP) {
    textureLoader.load(imagesMap[currentScreen], function (data) {
      texture = data;
      initScene();
    });
  } else {
    textureLoader.load(imagesMap[`${currentScreen}_${currentSlideId}`], function (data) {
      texture = data;
      initScene();
    });
  }
};

const updateScreenImg = (evt) => {
  if (evt.detail.screenName === screenNames.TOP || evt.detail.screenName === screenNames.STORY) {
    currentScreen = evt.detail.screenName;
    currentSlideId = evt.detail.slideId;
    initScreen();
  }
};


export const changeScreenScene = (name) => {
  if (name === screenNames.TOP || name === screenNames.STORY) {
    currentScreen = name;
    initScreen();
  }
  document.body.addEventListener(`screenChanged`, updateScreenImg);
};
