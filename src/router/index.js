import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import store from '../store/';

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView, meta: { guestOnly: true } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { guestOnly: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter(to, from, next) {
      store.dispatch('logout');
      next('/login');
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });  // Redirect to Login page if not authenticated
  } else if (to.matched.some(record => record.meta.guestOnly) && isAuthenticated) {
    next({ name: 'Dashboard' });  // Redirect to Dashboard if already logged in
  } else {
    next();  // Proceed as normal
  }
});

export default router;
