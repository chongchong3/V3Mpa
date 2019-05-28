import Vue from 'vue'
import App from './home.vue'
import router from './router'
import store from '../../store'
import {Button} from 'element-ui/packages/button'
import {Row} from 'element-ui/packages/row'
// import 'element-ui/lib/theme-chalk/index.css'
import './less/home.less'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Row)
// console.log('test');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
