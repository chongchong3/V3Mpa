import axios from '../../axios.decoration'
export const policyDetail = params =>axios.get('/api/policyRead/policyDetail',params);//详情页

export const problemTypeList = params =>axios.get('/gov/problem/problemTypeList',params);//问题类型
export const getEntDetails = params =>axios.get('/api/policyService/getEntDetails',params);//获取企业名称和统代的
export const policyLaunch = params =>axios.get('/api/policyService/policyLaunch',params);//弹出框提交



