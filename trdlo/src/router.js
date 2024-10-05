
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/HomePage.vue'; // Replace with your actual component


const routes = [
  { path: '/',  name: 'Home',  component: Home },
  { path: '/about',  name: 'About',  component: ()=> import('./views/AboutPage.vue') },
  {path: '/register', name: 'Register', component: ()=> import('./components/registerForm.vue')},
  {path: '/login', name: 'Login', component: ()=> import('./components/loginForm.vue')}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;