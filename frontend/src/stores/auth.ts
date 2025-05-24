import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({});
  const accessToken = ref(null);

  function setAccessToken(token: string) {
    accessToken.value = token;
  }

  async function setMe() {
    const me = await api.me.get();

    user.value = me;
  }

  async function refreshAccessToken() {
    try {
      const accessToken = await api.auth.refresh();

      setAccessToken(accessToken);
      // await setMe();
    } catch (e) {
      throw new Error();
    }
  }

  async function login({ accessToken: at }) {
    setAccessToken(at);
    await setMe();
  }

  function logout() {
    this.user = {};
    this.accessToken = null;
  }

  return { user, accessToken, login, logout, setMe, refreshAccessToken };
});
