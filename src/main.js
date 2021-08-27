import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUserCircle,
  faShoppingBag,
  faShoppingCart,
  faCube,
  faHospital,
  faStore,
  faBath,
  faUserCog,
  faSignOutAlt,
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons'

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import mixin from './mixin.js'

import VueGtag from 'vue-gtag'
Vue.use(VueGtag, {
  config: { id: 'G-4CHPH4BBLX' }
})

library.add(
  faUserCircle,
  faShoppingBag,
  faShoppingCart,
  faCube,
  faHospital,
  faStore,
  faBath,
  faUserCog,
  faSignOutAlt,
  faSignInAlt
)

axios.defaults.baseURL = process.env.VUE_APP_API
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.component('ImgInputer', ImgInputer)

Vue.use(VueFormWizard)

Vue.mixin(mixin)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
