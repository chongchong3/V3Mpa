import axios from '../../axios.decoration'

export const getArea = params => axios.get('/sys/getArea', params);

export const getUserList = params => axios.get('/sys/userList', params);

export const getRole = params => axios.get('/sys/getRole', params);

export const addUser = params => axios.get('/sys/createUser', params);
export const modifyUser = params => axios.get('/sys/modifyUser', params);
export const modifyPwd = params => axios.get('/sys/modifyPwd', params);
