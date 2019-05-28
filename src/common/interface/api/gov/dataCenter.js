import axios from '../../axios.decoration'

export const getHitory = params => axios.get('/gov/import/getHitory', params);

export const getFailList = params => axios.get('/gov/import/getFailList', params);

export const previewOnHtml = params => axios.get('/gov/import/previewOnHtml', params)

export const uploadFile = params => axios.upload('/gov/import/upload', params);

export const getNameList = params => axios.get('/gov/import/getNameList', params);
export const getExcelTitle = params => axios.postForm('/gov/import/getExcelTitle', params);

export const parseEntExcel = params => axios.postForm('/gov/import/parseEntExcel', params);
