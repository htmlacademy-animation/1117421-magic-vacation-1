import * as THREE from 'three';

export const setup3d = (far = 100, fov = 45) => {
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: false,
    logarithmicDepthBuffer: false,
    powerPreference: `high-performance`
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

export const simpleVertexShader = `
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}
`;

export const simpleFragmentShader = `
precision mediump float;

uniform sampler2D map;

varying vec2 vUv;

void main() {

vec4 texel = texture2D( map, vUv );

gl_FragColor = texel;

}
`;
