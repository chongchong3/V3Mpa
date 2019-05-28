import axios from '../../axios.decoration'

export const findList = params => axios.get('/gov/problemCount/findList', params);
