import Vue from 'vue'
import Router from 'vue-router'
import declartionEntryList from './views/declartionEntryList'
import addDeclartionEntry from './views/addDeclartionEntry'
import declarationGuide from './views/declarationGuide'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: '主页',
            redirect: '/declartionEntryList',
        },
        {
            path: '/declartionEntryList',
            name: '项目申报首页',
            component: declartionEntryList,
        },
        {
            path: '/addDeclartionEntry',
            name: '项目申报录入',
            component: addDeclartionEntry
        },{
            path: '/declarationGuide',
            name: '项目申报指南',
            component: declarationGuide
        }
    ]
})