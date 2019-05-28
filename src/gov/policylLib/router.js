import Vue from 'vue'
import Router from 'vue-router'
import policyLibList from './policyLibList'

const policyUpload = ()=> import('./policyUpload')
const policyDetail = () => import('./policyDetail')
Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: '主页',
            redirect: '/policyLibList',
        },{
            path: '/policyLibList',
            name: '政策文库列表',
            component: policyLibList
        },
        {
            path: '/policyUpload',
            name: '政策文库上传',
            component: policyUpload
        },{
            path: '/policyDetail',
            name: '政策文库详情',
            component: policyDetail
        }
    ]
})
