// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
// import Home from './components/Home.vue'; // Replace with your actual component
// import About from './components/About.vue'; // Replace with your actual component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
//   {
//     path: '/about',
//     name: 'About',
//     component: About
//   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;