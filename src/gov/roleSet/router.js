import Vue from 'vue'
import Router from 'vue-router'

import roleSetList from './roleSetList';
// const roleSetList = () => import('./roleSetList');
const addRole = () => import('./addRole');
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'roleSet',
        component: roleSetList
    },
    {
        path: '/addRole',
        name: 'addRole',
        component: addRole
    }
  ]
})
