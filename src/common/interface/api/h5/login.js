import axios from '../../axios.decoration'

export const login = params => axios.postForm('/user/login', params);
export const mobileLogin = params => axios.postForm('/user/mobile', params);

export const getVerifyCode = params => axios.get('/register/sendSmsCodeForLogin', params);

// register
export const certificate = params => axios.postForm('/register/entAuthentication', params);
export const uploadFile = params => axios.upload('/register/uploadEnt', params);
export const addUser = params => axios.postForm('/register/createUser', params)
