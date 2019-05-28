import axios from '../../axios.decoration'

//获取企业类型列表
export const getCompanyLabelList = () => axios.get('problem/companyLabelList');
//获取列表数据
export const getMyProblemList = (params) => axios.get('problem/myProblemList', params);

//发起问题
export const launchOrEditProblem = (params) => axios.get('problem/launchOrEdit', params);

//获取问题类型列表
export const getProblemTypelList = () => axios.get('problem/problemTypeList');

//模糊搜索企业列表
export const getCompanyInfoList = (params) => axios.get('problem/companyInfoList', params);
