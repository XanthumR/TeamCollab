<template>
  <v-container fluid class="todo-container">
    <!-- Header Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center">
            <v-icon size="40" color="primary" class="mr-3">mdi-clipboard-check</v-icon>
            <h1 class="text-h3 font-weight-bold">Todo Board</h1>
          </div>
          
          <v-chip class="text-h6" color="primary" variant="outlined">
            {{ totalTasks }} tasks
          </v-chip>
        </div>
        
        <!-- Add Task Form -->
        <v-card class="add-task-card" elevation="4">
          <v-card-text>
            <v-form @submit.prevent="addNewTask" ref="taskForm">
              <v-row align="center">
                <v-col cols="12" md="9">
                  <v-text-field
                    v-model="newTaskTitle"
                    label="Yeni görev ekle..."
                    variant="outlined"
                    prepend-inner-icon="mdi-plus-circle-outline"
                    :rules="taskRules"
                    hide-details="auto"
                    density="comfortable"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <v-btn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :disabled="!newTaskTitle.trim()"
                    prepend-icon="mdi-plus"
                    elevation="2"
                  >
                    Görev Ekle
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Task Statistics -->
    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-card class="stat-card todo-stat" elevation="3">
          <v-card-text class="text-center">
            <v-icon size="48" color="orange" class="mb-2">mdi-clock-outline</v-icon>
            <div class="text-h4 font-weight-bold">{{ todoCount }}</div>
            <div class="text-subtitle-1 text-medium-emphasis">To Do</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="4">
        <v-card class="stat-card progress-stat" elevation="3">
          <v-card-text class="text-center">
            <v-icon size="48" color="blue" class="mb-2">mdi-progress-clock</v-icon>
            <div class="text-h4 font-weight-bold">{{ inProgressCount }}</div>
            <div class="text-subtitle-1 text-medium-emphasis">In Progress</div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="4">
        <v-card class="stat-card done-stat" elevation="3">
          <v-card-text class="text-center">
            <v-icon size="48" color="green" class="mb-2">mdi-check-circle</v-icon>
            <div class="text-h4 font-weight-bold">{{ doneCount }}</div>
            <div class="text-subtitle-1 text-medium-emphasis">Done</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Task Columns -->
    <v-row>
      <!-- Todo Column -->
      <v-col cols="12" lg="4">
        <v-card class="column-card" elevation="4">
          <v-card-title class="d-flex align-center pa-4">
            <v-icon color="orange" class="mr-2">mdi-clock-outline</v-icon>
            <span class="text-h6">To Do</span>
            <v-spacer />
            <v-chip color="orange" variant="outlined" size="small">
              {{ todoTasks.length }}
            </v-chip>
          </v-card-title>
          
          <v-divider />
          
          <v-card-text class="task-list">
            <v-list v-if="todoTasks.length > 0" class="pa-0">
              <v-list-item
                v-for="task in todoTasks"
                :key="task.id"
                class="task-item mb-2"
                rounded="lg"
              >
                <template #prepend>
                  <v-icon color="orange">mdi-circle-outline</v-icon>
                </template>
                
                <v-list-item-title class="text-wrap">
                  {{ task.title }}
                </v-list-item-title>
                
                <template #append>
                  <v-menu>
                    <template #activator="{ props }">
                      <v-btn
                        icon="mdi-dots-vertical"
                        size="small"
                        variant="text"
                        v-bind="props"
                      />
                    </template>
                    
                    <v-list density="compact">
                      <v-list-item
                        @click="moveTaskToStatus(task.id, 'in-progress')"
                        prepend-icon="mdi-arrow-right"
                      >
                        Move to In Progress
                      </v-list-item>
                      <v-list-item
                        @click="moveTaskToStatus(task.id, 'done')"
                        prepend-icon="mdi-check"
                      >
                        Mark as Done
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-list-item>
            </v-list>
            
            <v-card v-else class="empty-state" variant="outlined">
              <v-card-text class="text-center py-8">
                <v-icon size="64" color="grey-lighten-1" class="mb-4">
                  mdi-clipboard-outline
                </v-icon>
                <div class="text-grey text-body-1">Henüz yapılacak görev yok</div>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- In Progress Column -->
      <v-col cols="12" lg="4">
        <v-card class="column-card" elevation="4">
          <v-card-title class="d-flex align-center pa-4">
            <v-icon color="blue" class="mr-2">mdi-progress-clock</v-icon>
            <span class="text-h6">In Progress</span>
            <v-spacer />
            <v-chip color="blue" variant="outlined" size="small">
              {{ inProgressTasks.length }}
            </v-chip>
          </v-card-title>
          
          <v-divider />
          
          <v-card-text class="task-list">
            <v-list v-if="inProgressTasks.length > 0" class="pa-0">
              <v-list-item
                v-for="task in inProgressTasks"
                :key="task.id"
                class="task-item mb-2"
                rounded="lg"
              >
                <template #prepend>
                  <v-icon color="blue">mdi-progress-clock</v-icon>
                </template>
                
                <v-list-item-title class="text-wrap">
                  {{ task.title }}
                </v-list-item-title>
                
                <template #append>
                  <v-menu>
                    <template #activator="{ props }">
                      <v-btn
                        icon="mdi-dots-vertical"
                        size="small"
                        variant="text"
                        v-bind="props"
                      />
                    </template>
                    
                    <v-list density="compact">
                      <v-list-item
                        @click="moveTaskToStatus(task.id, 'todo')"
                        prepend-icon="mdi-arrow-left"
                      >
                        Move to Todo
                      </v-list-item>
                      <v-list-item
                        @click="moveTaskToStatus(task.id, 'done')"
                        prepend-icon="mdi-check"
                      >
                        Mark as Done
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-list-item>
            </v-list>
            
            <v-card v-else class="empty-state" variant="outlined">
              <v-card-text class="text-center py-8">
                <v-icon size="64" color="grey-lighten-1" class="mb-4">
                  mdi-progress-clock
                </v-icon>
                <div class="text-grey text-body-1">Devam eden görev yok</div>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Done Column -->
      <v-col cols="12" lg="4">
        <v-card class="column-card" elevation="4">
          <v-card-title class="d-flex align-center pa-4">
            <v-icon color="green" class="mr-2">mdi-check-circle</v-icon>
            <span class="text-h6">Done</span>
            <v-spacer />
            <v-chip color="green" variant="outlined" size="small">
              {{ doneTasks.length }}
            </v-chip>
          </v-card-title>
          
          <v-divider />
          
          <v-card-text class="task-list">
            <v-list v-if="doneTasks.length > 0" class="pa-0">
              <v-list-item
                v-for="task in doneTasks"
                :key="task.id"
                class="task-item mb-2 completed-task"
                rounded="lg"
              >
                <template #prepend>
                  <v-icon color="green">mdi-check-circle</v-icon>
                </template>
                
                <v-list-item-title class="text-wrap text-decoration-line-through text-medium-emphasis">
                  {{ task.title }}
                </v-list-item-title>
                
                <template #append>
                  <v-menu>
                    <template #activator="{ props }">
                      <v-btn
                        icon="mdi-dots-vertical"
                        size="small"
                        variant="text"
                        v-bind="props"
                      />
                    </template>
                    
                    <v-list density="compact">
                      <v-list-item
                        @click="moveTaskToStatus(task.id, 'todo')"
                        prepend-icon="mdi-restore"
                      >
                        Move to Todo
                      </v-list-item>
                      <v-list-item
                        @click="moveTaskToStatus(task.id, 'in-progress')"
                        prepend-icon="mdi-arrow-left"
                      >
                        Move to In Progress
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-list-item>
            </v-list>
            
            <v-card v-else class="empty-state" variant="outlined">
              <v-card-text class="text-center py-8">
                <v-icon size="64" color="grey-lighten-1" class="mb-4">
                  mdi-check-circle-outline
                </v-icon>
                <div class="text-grey text-body-1">Tamamlanmış görev yok</div>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import type { Task } from '../types/task'

// Store
const taskStore = useTaskStore()

// Form data
const newTaskTitle = ref<string>('')
const taskForm = ref()

// Validation rules
const taskRules = [
  (v: string) => !!v.trim() || 'Görev başlığı gerekli',
  (v: string) => v.trim().length >= 3 || 'Görev başlığı en az 3 karakter olmalı',
  (v: string) => v.trim().length <= 100 || 'Görev başlığı en fazla 100 karakter olabilir'
]

// Computed properties
const todoTasks = computed(() => 
  taskStore.tasks.filter((task: Task) => task.status === 'todo')
)

const inProgressTasks = computed(() => 
  taskStore.tasks.filter((task: Task) => task.status === 'in-progress')
)

const doneTasks = computed(() => 
  taskStore.tasks.filter((task: Task) => task.status === 'done')
)

const totalTasks = computed(() => taskStore.tasks.length)
const todoCount = computed(() => todoTasks.value.length)
const inProgressCount = computed(() => inProgressTasks.value.length)
const doneCount = computed(() => doneTasks.value.length)

// Methods
const addNewTask = async (): Promise<void> => {
  const { valid } = await taskForm.value.validate()
  
  if (valid && newTaskTitle.value.trim()) {
    taskStore.addTask(newTaskTitle.value.trim())
    newTaskTitle.value = ''
    taskForm.value.resetValidation()
  }
}

const moveTaskToStatus = (taskId: number, newStatus: Task['status']): void => {
  taskStore.moveTask(taskId, newStatus)
}
</script>

<style scoped>
.todo-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 2rem 1rem;
}

.add-task-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.column-card {
  height: 600px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.task-list {
  height: 500px;
  overflow-y: auto;
  padding: 1rem !important;
}

.task-item {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.task-item:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.completed-task {
  opacity: 0.8;
}

.empty-state {
  background: rgba(255, 255, 255, 0.5);
  border: 2px dashed rgba(0, 0, 0, 0.1);
}

/* Custom scrollbar for task lists */
.task-list::-webkit-scrollbar {
  width: 6px;
}

.task-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.task-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.task-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .column-card {
    height: auto;
    margin-bottom: 1rem;
  }
  
  .task-list {
    height: auto;
    max-height: 400px;
  }
}

@media (max-width: 600px) {
  .todo-container {
    padding: 1rem 0.5rem;
  }
  
  .task-item:hover {
    transform: none;
  }
}

/* Animation classes */
.v-card,
.v-list-item {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>