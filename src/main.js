import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/global.css"
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Toaster from '@meforma/vue-toaster';

import axios from 'axios';
import { Model } from 'vue-api-query';
Model.$http = axios;

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(Toaster)
  .mount('#app')
