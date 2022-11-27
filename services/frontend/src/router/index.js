import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store';

import Dashboard from '@/views/Dashboard';
import EditNote from '@/views/EditNote';
import Home from '@/views/Home.vue';
import Login from '@/views/Login';
import Note from '@/views/Note';
import Profile from '@/views/Profile';
import Register from '@/views/Register';

const routes = [
  {
    path: '/',
    name: "Home",
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/editnote/:id',
    name: 'EditNote',
    component: EditNote,
    meta: { requiresAuth: true },
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
