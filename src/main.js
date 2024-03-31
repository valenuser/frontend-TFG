import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';


createApp(App).use(store).use(VueTelInput).use(router).mount('#app')
