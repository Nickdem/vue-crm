import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min';
import dateFilter from './filters/dateFilter'
import localizeFilter from './filters/localizeFilter'
import messagePugin from './utils/message.pugin'
import Loader from '@/components/app/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import currencyFilter from './filters/currencyFilter'
import tooltipDirective from '@/directives/tooltipDirective'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false
Vue.use(messagePugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.use(VueMeta)

firebase.initializeApp({
  //firebaseConfig 
  apiKey: "AIzaSyAaoPCXTdoD2o_pEzl_d6xoLKYuYdKKj24",
  authDomain: "vue-crm-48883.firebaseapp.com",
  databaseURL: "https://vue-crm-48883.firebaseio.com",
  projectId: "vue-crm-48883",
  storageBucket: "vue-crm-48883.appspot.com",
  messagingSenderId: "731253847521",
  appId: "1:731253847521:web:9265de01b83c85050acea0"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


