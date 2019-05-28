import axios from '../../axios.decoration'

export const getCheckList = (params)=>{
    return axios.get('/gov/entCheckData/findByPage',params);
}
