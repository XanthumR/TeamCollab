<script setup lang="ts">
import { ref } from 'vue'


const count = ref(0)
</script>

<template>
  <v-form>
    <v-text-field
      v-model="count"
      label="Count"
      type="number"
    ></v-text-field>
    <div>Count: {{ count }}</div>
  </v-form>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
