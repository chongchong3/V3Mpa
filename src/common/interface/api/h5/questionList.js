import axios from '../../axios.decoration'

export const getProblemList = params => axios.postForm('/appent/problem/problemFlowHandlerList', params);

export const deleteProblem = params => axios.postForm('/appent/problem/deleteProblem', params);

export const getProblemDetail = params => axios.postForm('/appent/problem/problemDetail', params);

export const getProblemType = params => axios.get('/appgov/problem/problemTypeList', params);

export const submitProblem = params => axios.postForm('/appent/problem/launchOrEdit', params);

export const getUserInfo = params => axios.postForm('/users/userInfo', params);

export const starComment = (params = {
    problemId: '',
    starLevel: 0
}) => axios.postForm('/ent/problem/starComment', params);

