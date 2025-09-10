<template>

</template>

<script setup lang="ts">




</script>

<style scoped>
.avatar-container {
  position: relative;
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0.5em 1em;
  z-index: 1;
}

.dropdown-item {
  display: block;
  padding: 0.5em 0;
  color: #555;
  text-decoration: none;
  transition: color 0.3s;
}

.dropdown-item:hover {
  color: #007bff;
}

v-btn {
  font-size: 0.9em;
  color: #007bff;
  cursor: pointer;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>