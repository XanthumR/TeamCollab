<template>
    <div ref="navbarBG" class="navbar-bg"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";

const navbarBG = ref<HTMLDivElement | null>(null);

const initThreeJS = () => {
    if (!navbarBG.value) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to white

    const camera = new THREE.PerspectiveCamera(
        75,
        navbarBG.value.offsetWidth / navbarBG.value.offsetHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(navbarBG.value.offsetWidth, navbarBG.value.offsetHeight);
    navbarBG.value.appendChild(renderer.domElement);

    // Create an array of black and white materials
    const materials = [
        new THREE.MeshBasicMaterial({ color: 0x000000 }), // Black
        new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
    ];

    const shapes: THREE.Mesh[] = [];

    // Create multiple shapes
    for (let i = 0; i < 10; i++) {
        const geometry = Math.random() > 0.5
            ? new THREE.BoxGeometry(1, 1, 1) // Cube
            : new THREE.SphereGeometry(0.5, 32, 32); // Sphere

        const material = materials[Math.floor(Math.random() * materials.length)];
        const shape = new THREE.Mesh(geometry, material);

        // Randomize position
        shape.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );

        // Add the shape to the scene and the array
        scene.add(shape);
        shapes.push(shape);
    }

    camera.position.z = 10;

    const animate = () => {
        requestAnimationFrame(animate);

        // Add rotation and movement to shapes
        shapes.forEach((shape) => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
            shape.position.x += (Math.random() - 0.5) * 0.01;
            shape.position.y += (Math.random() - 0.5) * 0.01;
        });

        renderer.render(scene, camera);
    };

    animate();
};

onMounted(() => {
    initThreeJS();
});
</script>

<style scoped>
.navbar-bg {
    width: 100%;
    height: 100px; /* Adjust height as needed */
    overflow: hidden;
}
</style>
