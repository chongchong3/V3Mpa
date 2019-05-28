import axios from '../../axios.decoration'
export const getSelect = params => axios.get('/api/policyService/getPolicyList', params);//筛选项
export const getProjectList = params => axios.get('/api/projectDeclare/getProjectDeclareList',params) ;//类表
