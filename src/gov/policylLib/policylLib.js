import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './policylLib.vue'
import router from './router'
import store from '../../store'

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueQuillEditor);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
