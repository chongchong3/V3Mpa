import axios from '../../axios.decoration'

// 获取详情页数据
export const problemDetail = (params) => axios.get('/ent/problem/problemDetail', params);

// 星级评价
export const starComment = (params) => axios.get('/ent/problem/starComment', params);
