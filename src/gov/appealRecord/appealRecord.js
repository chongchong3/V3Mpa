import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './appealRecord.vue'
import store from '../../store'

Vue.config.productionTip = false;

Vue.use(ElementUI)
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
