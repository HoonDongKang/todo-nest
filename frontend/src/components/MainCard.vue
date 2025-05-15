<template>
  <Login v-if="isLogin" @updateMode="changeMode" />
  <Register v-else @updateMode="changeMode" />
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
