import axios from '../../axios.decoration'

export const getProblemDepotList = (params = {
    pageNum: 1,
    labelCode: '',
    problemTypeId: '',
    startTime: '',
    problemStatus: '',
    key: ''
}) => axios.get('/appgov/problem/problemDepotList', params);

export const getCompanyLabelList = params => axios.get('/appgov/problem/companyLabelList', params);

export const getProblemTypeList = params => axios.get('/appgov/problem/problemTypeList', params);

export const problemGoBack = params => axios.get('/appgov/problem/goBack', params);

export const getProblemDetail = params => axios.postForm('/appent/problem/problemDetail', params);

export const problemDispatch = params => axios.postForm('/appgov/problem/dispatch', params);

export const getDepartmentList = params => axios.get('/appgov/problem/departmentList', params)
