import axios from '../../axios.decoration'

export const getEntDetails = params =>axios.get('/api/policyService/getEntDetails',params);
export const problemTypeList = params =>axios.get('/appgov/problem/problemTypeList',params)
export const policyLaunch = params =>axios.get('/appent/problem/policyLaunch',params)
