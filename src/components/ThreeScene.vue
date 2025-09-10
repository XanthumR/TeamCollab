<template>
  <div ref="container" class="fixed inset-0 -z-10 w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";

const container = ref<HTMLDivElement | null>(null);

// Globals (converted to module-scope vars inside component)
let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  composer: EffectComposer,
  clock: THREE.Clock;

let foldGroups: THREE.Group[] = [];
let geometricShapes: THREE.Mesh[] = [];
let animationSpeed = 1;
let animationPaused = false;
let filmPass: FilmPass, afterimagePass: AfterimagePass;

const init = () => {
  if (!container.value) return;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 50, 200);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 50);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1.0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.value.appendChild(renderer.domElement);

  // Composer (post-processing)
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  filmPass = new FilmPass(0.35, true); // noiseIntensity, scanlinesIntensity
  composer.addPass(new FilmPass(0.5, true)); // noiseIntensity, scanlinesIntensity
  composer.addPass(filmPass);

  afterimagePass = new AfterimagePass(0.96);
  composer.addPass(afterimagePass);
  afterimagePass.renderToScreen = true;

  // Clock
  clock = new THREE.Clock();

  setupLighting();
  createFoldingGeometry();
  createDynamicShapes();
  createParticleSystem();

  animate();
};

// --- Helpers (same as your original code, just scoped) ---
function setupLighting() {
  scene.add(new THREE.AmbientLight(0x404040, 0.3));

  const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
  light1.position.set(50, 50, 50);
  light1.castShadow = true;
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0x888888, 0.8);
  light2.position.set(-50, -50, 50);
  scene.add(light2);

  const light3 = new THREE.DirectionalLight(0xcccccc, 0.6);
  light3.position.set(0, 50, -50);
  scene.add(light3);
}

function createFoldingGeometry() {
  for (let i = 0; i < 8; i++) {
    const foldGroup = new THREE.Group();
    for (let j = 0; j < 6; j++) {
      const geometry = new THREE.PlaneGeometry(8, 12, 4, 4);
      const brightness = 0.2 + (Math.sin(i + j) * 0.5 + 0.5) * 0.8;
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(brightness, brightness, brightness),
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        shininess: 100,
        emissive: new THREE.Color(
          brightness * 0.3,
          brightness * 0.3,
          brightness * 0.3
        ),
      });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(
        (i - 4) * 12 + Math.sin(j) * 5,
        (j - 3) * 8 + Math.cos(i) * 3,
        Math.sin(i + j) * 10
      );
      plane.userData = {
        originalPos: plane.position.clone(),
        foldPhase: i + j * 0.5,
        foldAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
        baseBrightness: brightness,
      };
      foldGroup.add(plane);
    }
    foldGroups.push(foldGroup);
    scene.add(foldGroup);
  }
}

function createDynamicShapes() {
  for (let i = 0; i < 20; i++) {
    let geometry;
    if (i % 3 === 0) geometry = new THREE.ConeGeometry(2, 6, 3);
    else if (i % 3 === 1) geometry = new THREE.BoxGeometry(4, 2, 8);
    else geometry = new THREE.CylinderGeometry(1, 3, 8, 6);

    const brightness = 0.3 + (i / 20) * 0.7;
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(brightness, brightness, brightness),
      transparent: true,
      opacity: 0.8,
      shininess: 80,
      emissive: new THREE.Color(
        brightness * 0.2,
        brightness * 0.2,
        brightness * 0.2
      ),
    });
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 40
    );
    shape.userData = {
      originalPos: shape.position.clone(),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      oscillationPhase: Math.random() * Math.PI * 2,
      baseBrightness: brightness,
    };
    geometricShapes.push(shape);
    scene.add(shape);
  }
}

function createParticleSystem() {
  const particleCount = 200;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    const brightness = Math.random() * 0.8 + 0.2;
    colors[i * 3] = brightness;
    colors[i * 3 + 1] = brightness;
    colors[i * 3 + 2] = brightness;
  }

  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 1.0,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  });

  const particleSystem = new THREE.Points(particles, particleMaterial);
  particleSystem.userData = { particles };
  scene.add(particleSystem);
}

function animate() {
  requestAnimationFrame(animate);

  if (!animationPaused) {
    const elapsedTime = clock.getElapsedTime() * animationSpeed;

    // Folding planes
    foldGroups.forEach((group, groupIndex) => {
      group.children.forEach((plane: any) => {
        const userData = plane.userData;
        const foldAmount =
          Math.sin(elapsedTime * 0.5 + userData.foldPhase) * 0.8;
        plane.rotation.x = foldAmount;
        plane.rotation.y =
          Math.cos(elapsedTime * 0.3 + userData.foldPhase) * 0.6;
        plane.rotation.z =
          Math.sin(elapsedTime * 0.7 + userData.foldPhase) * 0.4;
      });
      group.rotation.y = Math.sin(elapsedTime * 0.2 + groupIndex) * 0.3;
    });

    // Shapes
    geometricShapes.forEach((shape: any) => {
      const userData = shape.userData;
      shape.rotation.x += userData.rotationSpeed.x;
      shape.rotation.y += userData.rotationSpeed.y;
      shape.rotation.z += userData.rotationSpeed.z;
    });

    // Gentle camera drift
    camera.position.x = Math.sin(elapsedTime * 0.1) * 20;
    camera.position.y = Math.cos(elapsedTime * 0.15) * 15;
    camera.lookAt(0, 0, 0);
  }

  composer.render();
}

// --- Lifecycle ---
onMounted(() => {
  init();
  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
  window.removeEventListener("mousemove", onMouseMove);
});

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

let mouseX = 0,
  mouseY = 0;
function onMouseMove(event: MouseEvent) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  camera.position.x += (mouseX * 10 - camera.position.x) * 0.02;
  camera.position.y += (mouseY * 10 - camera.position.y) * 0.02;
}
</script>
