import axios from '../../axios.decoration'

//获取企业类型列表
export const getCompanyLabelList = () => axios.get('problem/companyLabelList');

//获取问题类型列表
export const getProblemTypelList = () => axios.get('problem/problemTypeList');

//获取列表数据
export const getProblemFlowList = (params) => axios.get('problem/problemFlowList', params);