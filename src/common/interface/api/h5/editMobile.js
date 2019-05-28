import axios from '../../axios.decoration'

export const modifyByPhone = params => axios.get('/app/sys/modifyByPhone',params);
export const sendSmsCode = params => axios.get('/app/sys/sendSmsCode',params);
