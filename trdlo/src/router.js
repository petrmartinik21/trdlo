
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue'; // Replace with your actual component
import About from './views/AboutPage.vue'; // Replace with your actual component

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
     path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;