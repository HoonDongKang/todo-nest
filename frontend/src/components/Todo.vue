<template>
  <div class="pa-6 mx-auto" style="max-width: 600px">
    <v-card class="pa-4 rounded-xl elevation-3">
      <v-card-title class="text-h5 font-weight-bold"> Todo List </v-card-title>

      <v-text-field
        v-model="newTodo"
        label="Add a new todo"
        variant="outlined"
        density="compact"
        clearable
        prepend-inner-icon="mdi-format-list-checkbox"
        @keydown.enter="addTodo"
        @click:clear="newTodo = ''"
        class="mt-3"
      />

      <div
        v-if="todos.length === 0"
        class="text-medium-emphasis text-center mt-6"
      >
        No todos
      </div>

      <v-list v-else class="mt-4">
        <v-list-item
          v-for="todo in todos"
          :key="todo.id"
          class="rounded-lg mb-3 bg-grey-lighten-4"
        >
          <v-list-item-title class="text-body-1 font-weight-medium">
            {{ todo.title }}
          </v-list-item-title>

          <template #append>
            <v-btn
              icon
              color="red"
              variant="text"
              @click="removeTodo(todo.id)"
              :title="'Delete ' + todo.title"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { api } from '@/api';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const user = auth?.user;

const todos = ref([]);
const newTodo = ref('');

const getTodos = async () => {
  if (!user?.id) {
    router.go(-1);
    return;
  }

  todos.value = await api.todo.get(user.id);
};

const addTodo = async () => {
  todos.value.push({ id: todos.value.length, title: newTodo.value });
  newTodo.value = '';
};

const removeTodo = async (id) => {
  todos.value = todos.value.filter((_, i) => i !== id);
};

onMounted(() => {
  getTodos();
});
</script>
