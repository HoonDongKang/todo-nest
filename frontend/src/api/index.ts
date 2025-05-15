import { auth } from './auth';

export const api = {
  auth,
};

export default {
  install: (app) => {
    app.config.globalProperties.$api = api;
    app.provide('api', api);
  },
};
