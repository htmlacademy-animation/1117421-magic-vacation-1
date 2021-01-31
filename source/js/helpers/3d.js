import * as THREE from 'three';

export const setup3d = (far = 100, fov = 45) => {
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x5F458C);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, far);
  return {
    renderer,
    scene,
    camera
  };
};
