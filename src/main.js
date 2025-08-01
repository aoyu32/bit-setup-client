import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/common/global.scss'
import router from './router'
import 'bytemd/dist/index.css';
const app = createApp(App)
app.use(router)
app.mount('#app')

