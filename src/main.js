import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSocketIO from 'vue-socket.io';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import Translate from './lang/index';

// const colors = require('vuetify/es5/util/colors').default;

const VuetifyOption = {
  dark: true,
  themes: {
    light: {
      primary: '#1976D2',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00'
    },
    dark: {
      primary: '#2196F3',
      secondary: '#424242',
      accent: '#FF4081',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00'
    }
  }
};
Vue.use(VueI18n);

const i18nOption = {
  locale: 'fr',
  messages: Translate
};

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_BACKEND
  })
);
new Vue({
  i18n: new VueI18n(i18nOption),
  router,
  store,
  render: (h) => h(App),
  vuetify: new Vuetify(VuetifyOption)
}).$mount('#app');
