import Vue from 'vue';
import firebase from 'firebase';
import Router from 'vue-router';
import Login from './components/login.vue';
import Register from './components/register.vue';
import Main from './components/main.vue';
import Add from './components/add.vue';
import Edit from './components/edit.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit/:gid',
      name: 'edit',
      component: Edit,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: '/dashboard',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;