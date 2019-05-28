import axios from '../../axios.decoration'

export const userCenter = params => axios.get('/sys/userCenter', params);

export const modifyMyPwd = params => axios.get('/sys/modifyMyPwd', params);



