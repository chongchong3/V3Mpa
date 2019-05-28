import Vue from 'vue'
import Router from 'vue-router'
import main from "./main"
import batchAdd from "./batchAdd" //批量添加
import accurateAdd from "./accurateAdd" //精准添加
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path:'/',
          name:'main',
          component: main
      },
      {
          path:'/batchAdd',
          name:'batchAdd',
          component: batchAdd
      },
      {
          path:'/accurateAdd',
          name:'accurateAdd',
          component: accurateAdd
      },
  ]
})
