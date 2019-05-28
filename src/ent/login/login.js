import Vue from 'vue'
import { Checkbox } from 'element-ui'
import App from './login.vue'
import store from '../../store'

import "@/common/less/reset.less";
import "@/assets/font/iconfont.css";

Vue.config.productionTip = false;

Vue.use(Checkbox)
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
