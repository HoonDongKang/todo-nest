import axios from 'axios';

const $axios = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

$axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
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
          console.error(`HTTP 에러: ${error.response.status}`);
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
