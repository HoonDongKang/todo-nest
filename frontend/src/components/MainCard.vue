<template>
  <Login v-if="isLogin" @change="changeMode" />
  <Register v-else @change="changeMode" />
</template>
<script setup>
import { ref } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';
const isLogin = ref(true);

function changeMode() {
  isLogin.value = !isLogin.value;
}
</script>
