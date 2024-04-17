import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";


createApp(App).use(store).use(VueTelInput).use(Toast).use(router).mount('#app')
