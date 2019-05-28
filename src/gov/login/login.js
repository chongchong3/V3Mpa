import Vue from 'vue'
import { Checkbox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './login.vue'
import store from '../../store'

Vue.config.productionTip = false;

Vue.use(Checkbox)
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
