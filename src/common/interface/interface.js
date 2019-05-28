//接口统一配置
import axios from "./axios.decoration";
export const login = (params)=>{
   let url = 'user/login';
  //  let emulateJSON = true;
  return  axios.request({url,params})
}
export const findByPage = (params)=>{
    return axios.get('gov/entCheckData/findByPage',params);
}
