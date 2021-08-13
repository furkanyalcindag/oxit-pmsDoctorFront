import 'core-js/stable'
import Vue from 'vue'
import vuetimeline from "@growthbunker/vuetimeline";


import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import {iconsSet as icons} from './assets/icons/icons.js'
import store from './store/store'
import VeeValidate, {Validator} from 'vee-validate';
import VueLazyload from 'vue-lazyload'
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import CxltToastr from "cxlt-vue2-toastr";
import tr from 'vee-validate/dist/locale/tr';
import VCalender from 'v-calendar'

Vue.use(VueLazyload)
Vue.use(vuetimeline);

Vue.use(VeeValidate);
Validator.localize('tr', tr)
Vue.config.performance = true
Vue.use(VCalender, {
    componentPrefix: 'vc',
})
Vue.use(CoreuiVue)
Vue.config.productionTip = false;

var toastrConfigs = {
    position: 'top right',
    timeOut: 10000,
    progressBar: true
}
Vue.use(CxltToastr, toastrConfigs)


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
