<template>
    <nav>
    <router-link to="/home">Home</router-link>
  </nav>
    <RouterView/>
</template>

<script setup lang="ts">

</script>

<style scoped>
nav {
  padding: 1em;
  background-color: #f5f5f5;
  display: flex;
  gap: 1em;
  justify-content: center;
  margin-bottom: 2em;
}
</style>