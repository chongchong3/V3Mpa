import axios from '../../axios.decoration'

//筛选
export const getPolicyList = params => axios.get('/api/policyService/getPolicyList',params);
//列表
export const getPolicyFileList = params => axios.get('/api/projectDeclare/getProjectDeclareList',params)