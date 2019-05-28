import Vue from 'vue'
import Router from 'vue-router'
import declartionPublicList from './views/declartionPublicList'
import addDeclartionPublic from './views/addDeclartionPublic'
import publicDetails from './views/publicDetails'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '主页',
      redirect: '/declartionPublicList',
  },
  {
      path: '/declartionPublicList',
      name: '项目结果发布首页',
      component: declartionPublicList,
  },
  {
      path: '/addDeclartionPublic',
      name: '项目结果添加',
      component: addDeclartionPublic
  },
  {
      path: '/publicDetails',
      name: '项目详情',
      component: publicDetails
  }
  ]
})
