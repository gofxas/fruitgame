import { createApp, reactive } from 'vue'
import App from './App.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue';
import router from './router'
import 'element-plus/dist/index.css'
useRegisterSW();
const Menus = {
    state: reactive([]),
    setMenus(payload) {
        this.state = payload
    }
}
const app = createApp(App);
app.config.globalProperties.$menus = Menus;
app
.use(router)
.mount('#app')
