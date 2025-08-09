import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/common/global.scss'
import router from './router'
import 'bytemd/dist/index.css';
import { registerAnimateDirective } from './utils/gsap-animate';
import clickOutside from './directives/click-outside';
const app = createApp(App)
app.directive('click-out', clickOutside);
registerAnimateDirective(app)
app.use(router)
app.mount('#app')

