import * as THREE from 'three';
import {setup3d, simpleVertexShader, simpleFragmentShader} from "../helpers/3d";
import {screenNames} from "./utils";

const screens = [
  `top`,
  `story_0`,
  `story_1`,
  `story_2`,
  `story_3`
];
const images = [
  `img/scenes-textures/scene-0.png`,
  `img/scenes-textures/scene-1.png`,
  `img/scenes-textures/scene-2.png`,
  `img/scenes-textures/scene-3.png`,
  `img/scenes-textures/scene-4.png`
];


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
const textures = images.map((image) => textureLoader.load(image));

const getMaterial = (texture) => new THREE.RawShaderMaterial({
  uniforms: {
    map: {
      value: texture
    },
  },
  vertexShader: simpleVertexShader,
  fragmentShader: simpleFragmentShader
});
const getPlane = (material, width, height) => {
  const geometry = new THREE.PlaneBufferGeometry(width, height);
  const plane = new THREE.Mesh(geometry, material);
  material.needsUpdate = true;
  return plane;
};
const render = () => {
  renderer.render(scene, camera);
  animationId = requestAnimationFrame(() => {
    render();
  });
};

let currentScreen;
let currentSlideId = 0;
let animationId = null;

const initScene = (name) => {
  cancelAnimationFrame(animationId);
  let material;
  let plane;
  const index = screens.findIndex((screen) => screen === name);
  if (index !== -1) {
    material = getMaterial(textures[index]);
    plane = getPlane(material, imageWidth, imageHeight);
  }
  scene.add(plane);
  camera.position.z = 1000;
  requestAnimationFrame(() => {
    render();
  });
};

const initScreen = () => {
  if (currentScreen === screenNames.TOP) {
    initScene(currentScreen);
  } else {
    initScene(`${currentScreen}_${currentSlideId}`);
  }
};

const updateScreenImg = (evt) => {
  if (evt.detail.screenName === screenNames.TOP || evt.detail.screenName === screenNames.STORY) {
    currentScreen = evt.detail.screenName;
    currentSlideId = evt.detail.slideId;
    initScreen();
  } else {
    cancelAnimationFrame(animationId);
  }
};


export const changeScreenScene = (name) => {
  if (name === screenNames.TOP || name === screenNames.STORY) {
    currentScreen = name;
    initScreen();
  }
  document.body.addEventListener(`screenChanged`, updateScreenImg);
};
