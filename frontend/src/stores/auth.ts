import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});
  const accessToken = ref(null);
  const refreshToken = ref(null);

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  async function refreshAccessToken() {
    const res = await api.auth.refresh();
  }

  async function login({ accessToken: at }) {
    // setAccessToken(at);

    const me = await api.me.get();

    user.value = me;
  }

  function logout() {
    this.user = {};
    this.accessToken = null;
  }

  return { user, accessToken, refreshToken, login, logout, setAccessToken };
});
