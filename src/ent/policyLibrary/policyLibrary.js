import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './policyLibrary.vue'
import store from '../../store'

import "@/common/less/reset.less";
import "@/assets/font/iconfont.css";

Vue.config.productionTip = false;

Vue.use(ElementUI)
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
