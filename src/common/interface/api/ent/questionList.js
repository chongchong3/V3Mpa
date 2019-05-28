import axios from '../../axios.decoration'

//获取列表数据
export const getProblemFlowHandlerList = (params) => axios.get('/ent/problem/problemFlowHandlerList', params);

//发起问题
export const launchOrEditProblem = (params) => axios.get('/ent/problem/launchOrEdit', params);

//删除问题
export const deleteProblem = (params) => axios.get('/ent/problem/deleteProblem', params);

//获取问题类型列表
export const getProblemTypelList = () => axios.get('/gov/problem/problemTypeList');


//查询企业信息
export const getCompanyInfo = () => axios.get('/users/userInfo');