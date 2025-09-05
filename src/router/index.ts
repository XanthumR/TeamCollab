import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {path: '/', redirect: '/login' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
