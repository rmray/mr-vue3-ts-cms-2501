import 'normalize.css'
import './assets/main.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './store'
import icons from './utils/register-icons'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(icons)
app.mount('#app')
