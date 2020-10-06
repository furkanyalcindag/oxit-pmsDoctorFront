import 'core-js/stable'
import Vue from 'vue'

import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/store'
import VeeValidate from 'vee-validate';
import vuetify from '@/plugins/vuetify'








Vue.config.performance = true

Vue.use(CoreuiVue)
Vue.use(VeeValidate)




Vue.prototype.$log = console.log.bind(console)


new Vue({
  el: '#app',

  router,
  store,
  icons,
  vuetify,
  template: '<App/>',

  
  components: {
    App,
   
  }
})
