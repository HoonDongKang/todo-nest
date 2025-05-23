<template>
  <div>
    <div v-if="todos.length === 0">No todos</div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from '@/api';
import { useAuthStore } from '@/stores/auth';
import { useRoute } from 'vue-router';

const auth = useAuthStore();
const router = useRoute();
const user = auth?.user;

const todos = ref([]);

const getTodos = async () => {
  if (!user) {
    router.go(-1);
    return;
  }

  todos.value = await api.todo.get(user.id);
};

onMounted(() => {
  getTodos();
});
</script>
