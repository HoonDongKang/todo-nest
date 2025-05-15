import './assets/main.css';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import axiosPlugin from './plugins/axios';
import apiPlugin from './api';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(axiosPlugin).use(apiPlugin).mount('#app');
