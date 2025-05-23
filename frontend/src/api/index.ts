import { auth } from './auth';
import { me } from './me';
import { todo } from './todos';

export const api = {
  auth,
  me,
  todo,
};

export default {
  install: (app) => {
    app.config.globalProperties.$api = api;
    app.provide('api', api);
  },
};
