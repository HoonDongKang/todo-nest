import MainCard from '@/components/MainCard.vue';
import Todo from '@/components/Todo.vue';
import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: MainCard,
  },
  {
    path: '/todos',
    component: Todo,
    meta: { requiredAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta?.requiredAuth && !authStore.accessToken) {
    console.error('2');
    // alert('로그인이 필요합니다.');
    // return next('/');
  }

  next();
});

export default router;
