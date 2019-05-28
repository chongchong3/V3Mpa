import axios from '../../axios.decoration'

export const companyLabelList = params => axios.get('/gov/problem/companyLabelList', params);

export const problemTypeList = params => axios.get('/gov/problem/problemTypeList', params);

export const problemDepotList = params => axios.get('/gov/problem/problemDepotList', params);

