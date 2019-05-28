import Vue from 'vue'
import App from './login.vue'
import router from './router'
import store from '../../store'
import {Button} from 'element-ui/packages/button'//Row,Container,Aside,Header,Footer,Main,Col,Menu,Submenu,MenuItem,MenuItemGroup
import {Header} from 'element-ui/packages/header'
import {Footer} from 'element-ui/packages/footer'
import {Main} from 'element-ui/packages/main'
import {Container} from 'element-ui/packages/container'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
// Vue.use(Row);
Vue.use(Button);
Vue.use(Container);
// Vue.use(Aside);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
// Vue.use(Col);
// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// console.log('test');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

