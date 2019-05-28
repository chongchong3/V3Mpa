import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './companySelfCore.vue'
import router from './router'
import store from '../../store'
import "@less/reset.less";

Vue.config.productionTip = false;

Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
