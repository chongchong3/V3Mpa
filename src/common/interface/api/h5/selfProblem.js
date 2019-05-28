import axios from '../../axios.decoration'

//企业类型列表
export const companyLabelList = () => axios.get('/appgov/problem/companyLabelList');
// 问题列表
export const myProblemList = (params) => axios.get('/appgov/problem/myProblemList', params);


//问题类型
export const problemTypeList  = () => axios.get('/appgov/problem/problemTypeList');
//发起问题
export const launchOrEdit = (params) => axios.get('/appgov/problem/launchOrEdit', params);
//模糊搜索企业列表
export const getCompanyInfoList = (params) => axios.get('/appgov/problem/companyInfoList', params);