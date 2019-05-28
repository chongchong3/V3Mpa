import axios from '../../axios.decoration'


//main页面接口
export const getLabel = params => axios.get('/gov/import/getLabel', params);

export const deleteEntLable = params => axios.postForm('/gov/import/deleteEntLable', params);

//精准添加

export const getEntData = params => axios.get('/gov/import/getEntData', params);

export const insertEnt = params => axios.postForm('/gov/import/insertEnt', params);

//批量添加

export const getLableUpHistoryList = params => axios.get('/gov/import/getLableUpHistoryList', params);

export const getLabelFailList = params => axios.get('/gov/import/getLabelFailList', params);

export const importTypeLabel = params => axios.upload('/gov/import/importTypeLabel', params);
