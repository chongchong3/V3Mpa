import Vue from 'vue'
import Router from 'vue-router'
import townCheckList from "./townCheckList.vue"

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path:'/',
          name:'checkList',
          component: townCheckList
      }
  ]
})
