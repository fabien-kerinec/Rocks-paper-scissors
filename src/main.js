import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSocketIO from 'vue-socket.io';
import VueI18n from 'vue-i18n';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import Translate from './lang/index';

const colors = require('vuetify/es5/util/colors').default;

const VuetifyOption = {
  dark: true,
  themes: {
    dark: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  }
};
Vue.use(VueI18n);
Vue.use(VueAnalytics, {
  id: 'G-SW69Q6Z48L',
  debug: {
    enabled: true, // default value
    trace: true, // default value
    sendHitTask: true // default value
  }
});
const i18nOption = {
  locale: 'fr',
  messages: Translate
};

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: process.env.VUE_APP_BACKEND
  })
);
new Vue({
  i18n: new VueI18n(i18nOption),
  router,
  store,
  vuetify: new Vuetify(VuetifyOption),
  render: (h) => h(App)
}).$mount('#app');
