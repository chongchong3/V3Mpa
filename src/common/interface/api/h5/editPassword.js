import axios from '../../axios.decoration'
export const modifyMyPwd = params => axios.get('/sys/modifyMyPwd', params);
