import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'

const routes = [
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/tasks', name: 'TaskBoard', component: () => import('../views/TaskView.vue') },
  { path: "/channel/:id", name: "Channel", component: () => import('../views/ChannelView.vue') },
  { path: "/profile", name: "Profile", component: () => import('../views/ProfileView.vue') },
  { path: "/settings", name: "Settings", component: () => import('../views/Settings.vue') },
  { path: "/welcome", name: "Welcome", component: () => import('../views/WelcomePageView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// Add a router guard
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  const isLoggedIn = authStore.token !== null && authStore.token !== '';

  if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' }) // Redirect to login if not logged in
  } else {
    next() // Proceed to the route
  }
})

export default router
