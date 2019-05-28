import axios from '../../axios.decoration'

export const getDecalreResultDetail = params => axios.get('/api/projectDeclare/getDecalreResultDetail',params);

export const previewOnHtml = params => axios.get('/api/projectDeclare/previewOnHtml',params);

// export const getDecalreResultDetail = params => axios.get('/api/projectDeclare/getDecalreResultDetail',params);
