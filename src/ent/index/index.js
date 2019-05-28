import Vue from 'vue'
import App from './index.vue'
import 'element-ui/lib/theme-chalk/index.css';
import store from '../../store'

import "@/common/less/reset.less";
import "@/assets/font/iconfont.css";

Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
