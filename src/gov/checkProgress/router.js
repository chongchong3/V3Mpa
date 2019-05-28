import Vue from 'vue'
import Router from 'vue-router'
import checkProgressList from './checkProgressList.vue';
import CheckProgressDetail from "./checkProgressDetail.vue"

Vue.use(Router)

const router =  new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path:'/',
          name:'checkProcessList',
          meta: {
              title:'核对进展',
          },
          component:checkProgressList
      },
      {
          path:'/detail',
          name:'detail',
          meta: {
              title:'核对进展详情',
          },
          component: CheckProgressDetail
      }
  ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    } 
    next()
});

export default router