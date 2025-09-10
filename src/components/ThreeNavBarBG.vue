<template>
    <div ref="threeContainer" class="three-container"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";

const threeContainer = ref(null);

const initThreeJS = () => {
    const container = threeContainer.value;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Resize handling
    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Add random flying shapes
    const geometry = new THREE.TetrahedronGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const shapes = [];

    for (let i = 0; i < 50; i++) {
        const shape = new THREE.Mesh(geometry, material);
        shape.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        shape.userData.velocity = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
        };
        scene.add(shape);
        shapes.push(shape);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        shapes.forEach((shape) => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
            shape.position.x += shape.userData.velocity.x;
            shape.position.y += shape.userData.velocity.y;
            shape.position.z += shape.userData.velocity.z;

            // Reset position if out of bounds
            if (shape.position.length() > 10) {
                shape.position.set(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20
                );
            }
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
.three-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>
