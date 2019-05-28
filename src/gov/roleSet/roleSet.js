import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './roleSet.vue'
import router from './router'
import store from '../../store'
import ElementUI from 'element-ui'

Vue.config.productionTip = false;
Vue.use(ElementUI);

// Vue.prototype.$message = Message
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
