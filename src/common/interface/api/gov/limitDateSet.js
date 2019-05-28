import axios from '../../axios.decoration'

export const getCheckList = params => axios.get('/sys/dataCheckList', params);

export const modifyData = params => axios.get('/sys/modifyData', params);
