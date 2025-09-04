import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'
import { createPinia } from 'pinia'
import './style.css'
import router from './router'

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).use(router).use(pinia).mount('#app')