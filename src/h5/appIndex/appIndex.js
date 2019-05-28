import Vue from 'vue'
import 'amfe-flexible'
import fastClick from 'fastclick'

import Vant from 'vant'
import { Autocomplete } from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css'


import App from './routerPage.vue'
import router from './router'
import store from '../../store'
import '../../common/less/reset.less'

// 300ms延迟
fastClick.attach(document.body);
Vue.use(Vant);
Vue.use(Autocomplete);


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
