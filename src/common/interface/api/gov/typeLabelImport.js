import axios from '../../axios.decoration';

export const getLabelList = params => axios.get('/gov/import/getLabelList', params);

export const insertLabel = params => axios.postForm('/gov/import/insertLabel', params);

export const deleteLable = params => axios.postForm('/gov/import/deleteLable', params);


