import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from "./store/index"
import Axios from './request/index.js'
const app = createApp(App)
import './assets/css/base.scss'

app.config.globalProperties.$axios = Axios
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
