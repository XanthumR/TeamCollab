import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles/main.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


// Components
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router'

const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')