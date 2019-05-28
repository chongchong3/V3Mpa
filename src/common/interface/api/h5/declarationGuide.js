import axios from '../../axios.decoration'

export const getProjectDeclareDetail = params => axios.get('/api/projectDeclare/getProjectDeclareDetail',params)

export const previewOnHtml = params => axios.get('/api/projectDeclare/previewOnHtml',params);
