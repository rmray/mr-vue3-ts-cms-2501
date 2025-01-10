import 'normalize.css'
import './assets/css/main.less'

import { createApp } from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'
import icons from './utils/register-icons'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(icons)
app.mount('#app')
