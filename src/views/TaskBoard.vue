<template>
  <div>
    <form @submit.prevent="add">
      <input v-model="newTask" placeholder="Yeni görev ekle" class="border p-2 rounded mr-2" />
      <button type="submit" class="px-3 py-2 bg-blue-500 text-white rounded">Ekle</button>
    </form>

    <div class="flex gap-4 mt-6">
      <TaskColumn title="To-do" :tasks="todoTasks" />
      <TaskColumn title="In Progress" :tasks="inProgressTasks" />
      <TaskColumn title="Done" :tasks="doneTasks" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTaskStore } from "../stores/taskStore";
import TaskColumn from "../components/TaskColumn.vue";


const store = useTaskStore();
const newTask = ref("");

function add() {
  if (newTask.value.trim()) {
    store.addTask(newTask.value);
    newTask.value = "";
  }
}

const todoTasks = computed(() => store.tasks.filter((t) => t.status === "todo"));
const inProgressTasks = computed(() => store.tasks.filter((t) => t.status === "in-progress"));
const doneTasks = computed(() => store.tasks.filter((t) => t.status === "done"));
</script>
