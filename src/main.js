import 'core-js/stable'
import Vue from 'vue'

import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/store'
//import VeeValidate from 'vee-validate';
import VueLazyload from 'vue-lazyload'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import CxltToastr from "cxlt-vue2-toastr";


Vue.use(VueLazyload)











Vue.config.performance = true

Vue.use(CoreuiVue)
//Vue.use(VeeValidate)
Vue.use(CxltToastr)





Vue.prototype.$log = console.log.bind(console)


new Vue({
  el: '#app',

  router,
  store,
  icons,

  template: '<App/>',

  
  components: {
    App,
    VueUploadMultipleImage
   
  }
})
