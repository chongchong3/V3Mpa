import axios from '../../axios.decoration'


export const getProblemDetail = params => axios.get('/appgov/problem/problemDetail', params)

export const getDepartmentList = params => axios.get('/appgov/problem/departmentList', params)

export const handlerProblem = params => axios.get('/appgov/problem/handlerProblem', params);

export const superviseProblem= params => axios.get('/appgov/problem/problemSupervise', params);

export const starComment = params => axios.get('appgov/problem/starComment', params);

