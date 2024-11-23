import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { createMemoryHistory, createRouter } from "vue-router";

import HotelsPage from "./pages/HotelsPage.vue";
import WelcomePage from "./pages/WelcomePage.vue";

const routes = [
    { path: "/", component: WelcomePage },
    { path: "/hotels", component: HotelsPage },
  ];
  
const router = createRouter({
history: createMemoryHistory(),
routes,
});

const pinia = createPinia()
const app = createApp(App)

app.use(router);
app.use(pinia)
app.mount('#app')
