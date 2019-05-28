import axios from '../../axios.decoration'

export const getLableUpHistoryList = params => axios.get('/gov/import/getLableUpHistoryList', params);

export const getImportList = params => axios.get('/gov/import/anotherImport', params);

export const importLabel = params => axios.upload('/gov/import/importLabel', params);

export const getEntData = params => axios.get('/gov/import/getEntData', params);

export const getLeader = params => axios.get('/gov/import/getLeader', params);

export const updateLabel = params => axios.get('/gov/import/updateLabel', params);

export const deleteLabel = params => axios.get('/gov/import/deleteLabel', params);

export const insertLabel2513 = params => axios.postForm('/gov/import/insertLabel2513', params);

