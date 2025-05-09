import { createRouter, createWebHistory } from 'vue-router'
// import DrawingOverview from '@/components/drawings/DrawingOverview.vue'
// import ReferenceOverview from '@/components/references/ReferenceOverview.vue'
import HomeView from '@/views/HomeView.vue';
import StreaksViews from '@/views/StreaksViews.vue';
import CreateReferenceView from '@/views/references/CreateReferenceView.vue';
import AuthView from '@/views/AuthView.vue';
import AuthSuccess from '@/views/AuthSuccess.vue';
import LandingPage from '@/views/LandingPage.vue';
import { useUserStore } from '@/stores/userStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: { requiresGuest: true }
    }, 
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { requiresGuest: true }
    },
    {
      path: '/authSuccess',
      name: 'authSuccess',
      component: AuthSuccess,
      meta: { requiresGuest: true }
    },
    {
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/streaks',
      name: 'streaks',
      component: StreaksViews,
      meta: { requiresAuth: true }
    },
    {
      path: '/references',
      name: 'references',
      component: CreateReferenceView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard
router.beforeEach((to, _, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.meta.requiresAuth;
  const requiresGuest = to.meta.requiresGuest;

  if (requiresAuth && !userStore.isAuthenticated) {
    next('/auth');
  } else if (requiresGuest && userStore.isAuthenticated && to.path !== '/') {
    next('/');
  } else {
    next();
  }
});

export default router