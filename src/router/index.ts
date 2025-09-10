import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../stores/AuthStore'

const routes = [
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/tasks', name: 'TaskBoard', component: () => import('../views/TaskBoard.vue') },
  { path: "/channel/:id", component: () => import('../views/ChannelView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// Add a router guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.token !== null && authStore.token !== '';

  if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' }) // Redirect to login if not logged in
  } else {
    next() // Proceed to the route
  }
})

export default router
