import axios from '../../axios.decoration'

//模糊查询企业
export const getLikeEnt = (params) => axios.get('/gov/entData/getLikeEnt', params);

//查询工商信息
export const queryEnt = (params) => axios.get('/appgov/entData/queryEnt', params);

//问题反馈列表
export const showProblemList = (params) => axios.get('/appgov/entData/showProblemList', params);