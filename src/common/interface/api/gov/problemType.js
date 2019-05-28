import axios from '../../axios.decoration'

export const getProblemList = params => axios.get('/sys/problemList', params);

export const addProblemType = params => axios.postForm('/sys/createProblemType', params);

export const modifyProblemType = params => axios.postForm('/sys/updateProblemType', params);

export const delProblemType = params => axios.postForm('/sys/deleteProblemType', params);
