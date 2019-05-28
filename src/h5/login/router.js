import Vue from 'vue'
import Router from 'vue-router'
const login = () => import('./login.vue')
const register = () => import('./register.vue')

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: '企业登录',
            component: login
        }, {
            path: '/register',
            name: '注册',
            component: register
        }
    ]
})
