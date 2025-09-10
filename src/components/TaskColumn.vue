<template>
  <div class="w-1/3 p-3">
    <h2 class="text-lg font-bold mb-3">{{ title }}</h2>
    <div class="space-y-2">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskCard from "./TaskCard.vue";
import type { Task } from "../types/task";

defineProps<{
  title: string;
  tasks: Task[];
}>();
</script>
