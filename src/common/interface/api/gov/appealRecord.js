import axios from '../../axios.decoration'

export const getAppealList = (params)=>{
    return axios.get('/gov/entComplainRecord/findByPage',params);
}
