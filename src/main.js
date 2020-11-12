import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from './router';
import './filters';

import axios from 'axios';
Vue.prototype.$axios = axios; //can access axios globally

import jquery from 'jquery';
window.$ = jquery;
window.jquery = jquery;

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';

window.Swal = Swal;

// vue select
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect);

// sweet alert
import swal from 'sweetalert';
window.swal = swal;
Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

// v-calendar
import VCalendar from 'v-calendar';
Vue.use(VCalendar);

// vuelidate
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

// vue loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading, {
  container: null,
  canCancel: false,
  color: '#2f69de',
  height: 100,
  width: 100,
  backgroundColor: '#fff',
  zIndex: 100000
});

// vue2-perfect-scrollbar
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
Vue.use(PerfectScrollbar);

// vue scroll
import vuescroll from 'vuescroll';
Vue.use(vuescroll);
// Vue.use(vuescroll, {
//   ops: {
//     // The global config
//   },
//   name: 'myScroll' // customize component name, default -> vueScroll
// });

// vue simple validator
import SimpleVueValidation from 'simple-vue-validator';
window.Validator = SimpleVueValidation.Validator;
Vue.use(SimpleVueValidation);

// vue carousel
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

// vue table
import Vuetable from 'vuetable-2';

// vue-good-table
import VueGoodTablePlugin from 'vue-good-table';
// import 'vue-good-table/dist/vue-good-table.css'
Vue.use(VueGoodTablePlugin);

// vue-native-websocket
// import VueNativeSock from 'vue-native-websocket'
// Vue.use(VueNativeSock, 'ws://app.onimtait.test:8080', { format: 'json', reconnection: true, reconnectionAttempts: 5, reconnectionDelay: 3000 })

import CxltToastr from 'cxlt-vue2-toastr';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
var toastrConfigs = {
  position: 'top right',
  showDuration: 5000
};
Vue.use(CxltToastr, toastrConfigs);

import 'file-saver';

// jsPDF
import jsPDF from 'jspdf';
import 'jspdf-autotable';
window.jsPDF = jsPDF;

/*
 * Date 2020/07/15 10.41 AM
 * Dilan Jayamuni
 *
 * Vuesax switch
 */
import Vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css'; //Vuesax styles
Vue.use(Vuesax, {
  // options here
});

Vue.config.productionTip = false;

// vue-loading-skeleton
import Skeleton from 'vue-loading-skeleton';
Vue.use(Skeleton);

// vue-multiselect
import Multiselect from 'vue-multiselect';
Vue.component('multiselect', Multiselect);

import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

//vue json excel
import JsonExcel from 'vue-json-excel';
Vue.component('downloadExcel', JsonExcel);

Vue.use(Datetime);
Vue.component('datetime', Datetime);

Vue.config.productionTip = false;

require('@/store/subscriber');

axios.defaults.baseURL = process.env.VUE_APP_LARAVEL_APP_API;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        name: 'login'
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.isAuthenticated) {
      next({
        name: 'dashboardLayout'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

Vue.component(
  'activity-modal-content',
  require('./components/ActivityModalContent.vue').default
);
Vue.component(
  'all-job-dropdown',
  require('./components/AllJobDropdown.vue').default
);
Vue.component(
  'job-due-date-history',
  require('./components/DueDateChangeHistory.vue').default
);
Vue.component(
  'qc-change-modal',
  require('./components/QCEmployeeChangeModal.vue').default
);

new Vue({
  store,
  router,
  components: { Vuetable },
  render: (h) => h(App)
}).$mount('#app');
