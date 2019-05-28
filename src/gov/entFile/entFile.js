import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EntFile from './entFile.vue'
import store from '../../store'

Vue.config.productionTip = false;

Vue.use(ElementUI)
new Vue({
    store,
    render: h => h(EntFile)
}).$mount('#entFile')
