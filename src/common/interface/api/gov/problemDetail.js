import axios from '../../axios.decoration'

export const departmentList = params => axios.get('/gov/problem/departmentList', params);

export const problemDetail = params => axios.get('/gov/problem/problemDetail', params);

export const goBack = params => axios.postForm('/gov/problem/goBack', params);

export const dispatch = params => axios.postForm('/gov/problem/dispatch', params);