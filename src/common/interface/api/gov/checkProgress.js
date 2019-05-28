import axios from '../../axios.decoration'

/**核对进展首页数据*/
export const uploadResult = params => axios.get('/gov/entCheckData/uploadResult', params);

/**核对进展详情页*/
//列表数据
export const findByPage = params => axios.get('/gov/entCheckData/findByPage', params);
//获取所属乡镇
export const getTownList = () => axios.get('/gov/entCheckData/getTownList');
