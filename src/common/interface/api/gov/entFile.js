import axios from '../../axios.decoration'
//企业档案条件筛选
export const getIndustry = (params)=>{
    return axios.get('/gov/entData/getIndustry',params);
 }
 //初始化列表
export const getEntList = (params)=>{
    return axios.get('/gov/entData/getEntList',params);
 }

