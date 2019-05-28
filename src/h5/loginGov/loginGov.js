import Vue from 'vue'
import 'amfe-flexible';
import '../../common/less/reset.less'
import Vant from 'vant';
import 'vant/lib/index.css';
import App from './loginGov.vue'
import store from '../../store'

Vue.use(Vant);


Vue.config.productionTip = false
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
