import axios from '../../axios.decoration'

export const getDeclareResultList = params => axios.get('/api/projectDeclare/getDeclareResultList',params);