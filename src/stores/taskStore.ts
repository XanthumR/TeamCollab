import { defineStore } from "pinia";
import type { Task } from "../types/task";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [
      { id: 1, title: "Vue Router öğren", status: "todo" },
      { id: 2, title: "Login formuna validasyon ekle", status: "in-progress" },
      { id: 3, title: "Projeyi Netlify’a deploy et", status: "done" },
    ] as Task[],
  }),
  actions: {
    addTask(title: string) {
      this.tasks.push({
        id: Date.now(),
        title,
        status: "todo",
      });
    },
    moveTask(id: number, newStatus: Task["status"]) {
      const task = this.tasks.find((t) => t.id === id);
      if (task) task.status = newStatus;
    },
  },
});
