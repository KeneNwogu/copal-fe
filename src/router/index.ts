import { createRouter, createWebHistory } from 'vue-router'
// import DrawingOverview from '@/components/drawings/DrawingOverview.vue'
// import ReferenceOverview from '@/components/references/ReferenceOverview.vue'
import HomeView from '@/views/HomeView.vue';
import StreaksViews from '@/views/StreaksViews.vue';
import CreateReferenceView from '@/views/references/CreateReferenceView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/streaks',
      name: 'streaks',
      component: StreaksViews
    },
    {
      path: '/references',
      name: 'references',
      component: CreateReferenceView
    }
  ]
})

export default router