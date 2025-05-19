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

  function setRefreshToken(token: string) {
    refreshToken.value = token;
  }

  async function login({ accessToken: at, refreshToken: rt }) {
    setAccessToken(at);
    setRefreshToken(rt);

    await api.me.get();
  }

  return { user, accessToken, refreshToken, login };
});
