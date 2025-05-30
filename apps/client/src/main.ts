import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'

import About from './pages/aboutPage.vue'
import Home from './pages/homePage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const pinia = createPinia()

createApp(App).use(router).use(VueQueryPlugin).use(pinia).mount('#app')
