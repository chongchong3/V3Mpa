import axios from '../../axios.decoration'

export const getDeclareDetail = params => axios.get('/api/projectDeclare/getProjectDeclareDetail',params) ;//类表

export const previewOnHtml = params => axios.get('/api/projectDeclare/previewOnHtml',params) ;//类表
