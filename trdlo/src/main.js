import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import {createRouter, createWebHistory} from "vue-router";
import router from './router';



const app = createApp(App);
app.use(router); // Install the router
app.mount('#app');


// const routes = []

// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })


// createApp(App).use(router).mount('#app')
