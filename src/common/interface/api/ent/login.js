import axios from '../../axios.decoration'


export const sendSmsCodeForLogin = params => axios.get('/register/sendSmsCodeForLogin', params);

export const mobile = params => axios.postForm('/user/mobile', params);
