import Vue from 'vue'
import Router from 'vue-router'

import routerPage from './routerPage.vue';
Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            alias: '/appIndex',
            component: () => import('./page/appIndex.vue')
        },

        // 企业档案
        {
            path: '/entFile',
            component: routerPage,
            children: [
                {
                    path: '/',
                    name: 'entSearch',
                    alias: '/entSearch',
                    component: () => import('./page/entFile/entSearch.vue')
                }, {
                    path: 'entDatail',
                    name: 'entDatail',
                    component: () => import('./page/entFile/entDetail.vue')
                }
            ]
        },

        // 惠企政策
        {
            path: '/hQpolicy',
            component: routerPage,
            children: [
                {
                    path: '/',
                    name: 'hQpolicy',
                    component: () => import('./page/hQpolicy/hQpolicy.vue')
                }, {
                    path: 'declareItem',
                    name: 'declareItem',
                    component: () => import('./page/hQpolicy/declareItem.vue')
                }, {
                    path: 'declaration',
                    name: 'declaration',
                    component: () => import('./page/hQpolicy/declaration.vue')
                },
                {
                    path: 'declarationDetail',
                    name: 'declarationDetail',
                    component: () => import('./page/hQpolicy/declarationDetail.vue')
                },
                {
                    path: 'declarationGuide',
                    name: 'declarationGuide',
                    component: () => import('./page/hQpolicy/declarationGuide.vue')
                },
                {
                    path: 'policyLibrary',
                    name: 'policyLibrary',
                    component: () => import('./page/hQpolicy/policyLibrary.vue')
                },
                {
                    path: 'policyLibraryDetail',
                    name: 'policyLibraryDetail',
                    component: () => import('./page/hQpolicy/policyLibraryDetail.vue')
                },
                {
                    path: 'policyConsultation',
                    name: 'policyConsultation',
                    component: () => import('./page/hQpolicy/policyConsultation.vue')
                }
            ]
        },

        // 个人中心
        {
            path: '/personalCenter',
            component: routerPage,
            children: [
                {
                    path: '/',
                    name: 'personalCenter',
                    component: () => import('./page/personalCenter/personalCenter.vue')
                },
                {
                    path: 'editMobile',
                    name: 'editMobile',
                    component: () => import('./page/personalCenter/editMobile.vue')
                },
                {
                    path: 'editPassword',
                    name: 'editPassword',
                    component: () => import('./page/personalCenter/editPassword.vue')
                }
            ]
        },

        // 企业端——问题反馈
        {
            path: '/questionList',
            component: routerPage,
            children: [
                {
                    path: '/',
                    name: 'questionList',
                    alias: 'questionList',
                    component: () => import('./page/problem/questionList.vue')
                }, {
                    path: 'questionDetail',
                    name: 'questionDetail',
                    component: () => import('./page/problem/questionDetail.vue')
                }, {
                    path: 'questionForm',
                    name: 'questionForm',
                    component: () => import('./page/problem/questionForm.vue')
                }
            ]
        },

        {
            path: '/problemWarehouse',
            component: routerPage,
            children: [
                {
                    path: '/',
                    name: 'problemWarehouse',
                    component: () => import('./page/problem/problemWarehouse.vue')
                },{
                    path: 'problemDetail',
                    name: 'problemDetail',
                    component: () => import('./page/problem/problemDetail.vue')
                }
            ]
            
        },{
            path: '/resolveProblem',
            name: 'resolveProblem',
            component: () => import('./page/problem/resolveProblem.vue')
        },


        {
            path: '/problemFlow',
            name: 'problemFlow',
            component: () => import('./page/problem/problemFlow.vue')
        },{
            path: '/problemStatis',
            name: 'problemStatis',
            component: () => import('./page/problem/problemStatis.vue')
        },{
            path: '/selfProblem',
            name: 'selfProblem',
            component: () => import('./page/problem/selfProblem/selfProblem.vue')
        },{
            path: '/launchProblem',
            name: 'launchProblem',
            component: () => import('./page/problem/selfProblem/launchProblem.vue')
        },
    ]
})
