import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import axiosPlugin from './plugins/axios';
import apiPlugin from './api';
import router from '../router';

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .use(axiosPlugin)
  .use(apiPlugin)
  .mount('#app');
