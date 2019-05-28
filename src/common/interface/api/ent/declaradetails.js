import axios from '../../axios.decoration'
export  const getDecalreResultDetail = params =>axios.get('/api/projectDeclare/getDecalreResultDetail',params);

export const previewOnHtml = params => axios.get('/api/projectDeclare/previewOnHtml',params) ;//类表
export const downloadFile = (...params) => axios.download('/gov/selfCheck/downloadFile', ...params);//下载
