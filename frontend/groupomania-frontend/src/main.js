import { createApp, VueElement } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router/index'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'


const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
// axios.defaults.headers.post['Content-type'] = 'application/json'

createApp(App).use(router).mount('#app')
