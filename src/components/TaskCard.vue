<template>
  <div class="p-3 bg-white rounded shadow mb-2">
    <p>{{ task.title }}</p>
    <div class="flex gap-2 mt-2 text-sm">
      <button @click="move('todo')" class="px-2 py-1 bg-gray-200 rounded">To-do</button>
      <button @click="move('in-progress')" class="px-2 py-1 bg-blue-200 rounded">In Progress</button>
      <button @click="move('done')" class="px-2 py-1 bg-green-200 rounded">Done</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from "../stores/taskStore";
import type { Task } from "../types/task";

const props = defineProps<{ task: Task }>();
const store = useTaskStore();

function move(status: Task["status"]) {
  store.moveTask(props.task.id, status);
}
</script>
