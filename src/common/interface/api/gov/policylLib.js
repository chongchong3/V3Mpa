import axios from '../../axios.decoration'

export const getDropDownList = params => axios.get('/api/policyService/getPolicyList', params);

export const getDataList = params => axios.get('/api/policyService/getPolicyFileList', params);

export const delPolicyById = params => axios.get('/api/policyService/deletePolicyFile', params);

export const addPolicy = parmas => axios.postForm('/api/policyService/insertUploadFileInfo', parmas);

export const editPolicy = params => axios.postForm('/api/policyService/updateUploadFileInfo', params);

export const getPolicyById = params => axios.get('/api/policyService/findUploadFileInfo', params);

export const uploadFileUrl = '/api/policyService/uploadFile';

export const downloadFile = (...params) => axios.download('/api/policyService/downloadFile', ...params);

