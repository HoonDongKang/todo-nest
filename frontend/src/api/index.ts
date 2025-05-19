import { auth } from './auth';
import { me } from './me';

export const api = {
  auth,
  me,
};

export default {
  install: (app) => {
    app.config.globalProperties.$api = api;
    app.provide('api', api);
  },
};
