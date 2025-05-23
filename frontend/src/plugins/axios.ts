import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/api';
import { useRouter } from 'vue-router';

const $axios = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

$axios.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const accessToken = authStore?.accessToken || null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          const auth = useAuthStore();
          const router = useRouter();
          const originalRequest = error.config;

          if (!originalRequest._retry) {
            originalRequest._retry = true;

            try {
              const accessToken = (await api.auth.refresh()).data;

              auth.setAccessToken(accessToken);
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;

              return $axios(originalRequest);
            } catch (e) {
              if (error.response?.data?.message === 'INVALID_REFRESH_TOKEN') {
                auth.logout();
                router.push('/');
              }
              return Promise.reject(e);
            }
          }

          break;
        case 403:
          console.error('접근 권한이 없습니다.');
          break;
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error('서버 오류가 발생했습니다.');
          break;
        default:
          console.error(error.response?.data?.message);
      }
    } else if (error.request) {
      console.error('서버에서 응답이 없습니다.');
    } else {
      console.error('요청 설정 중 오류가 발생했습니다:', error.message);
    }

    return Promise.reject(error);
  },
);

export default {
  install: (app) => {
    app.config.globalProperties.$axios = $axios;

    app.provide('axios', $axios);
  },
};

export { $axios };
