import axios from '../../axios.decoration'

export const getSelect = params => axios.get('/api/policyService/getPolicyList', params);//筛选项
export const getList = params =>axios.get('/api/policyService/getPolicyFileList', params);//列表项
