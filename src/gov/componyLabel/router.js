import Vue from 'vue'
import Router from 'vue-router'

import mainPage from './mainPage'

const addTable = () => import('./addTable');
const uploadPage = () => import('./uploadPage');
Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: '2513企业导入',
            component: mainPage
        }, {
            path: '/addTable',
            name: '精准添加',
            component: addTable
        }, {
            path: '/uploadList',
            name: '批量导入',
            component: uploadPage
        }
    ]
})
