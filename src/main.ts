import 'normalize.css'
import './assets/main.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './store'

// const name = 'test'

// test.name

createApp(App).use(router).use(pinia).mount('#app')
