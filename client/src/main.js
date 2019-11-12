import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbvue/build/css/mdb.css';
import Notifications from './components/NotificationPlugin';
import Material from './material';

Vue.use(Notifications)
Vue.config.productionTip = false
Vue.use(Material)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
