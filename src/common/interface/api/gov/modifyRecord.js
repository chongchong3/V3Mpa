import axios from '../../axios.decoration'

export const findByPage = params => axios.get('/gov/dataEditLog/findByPage', params);
