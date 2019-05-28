import axios from '../../axios.decoration'

export const getCompanyLabelList = params => axios.get('/appgov/problem/companyLabelList', params);

export const getProblemTypeList = params => axios.get('/appgov/problem/problemTypeList', params);

export const getProblemFlowList = params => axios.get('/appgov/problem/problemFlowList', params);