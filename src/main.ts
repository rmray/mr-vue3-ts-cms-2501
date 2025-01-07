import 'normalize.css'
import './assets/main.less'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// const name = 'test'

// test.name

createApp(App).use(router).mount('#app')
