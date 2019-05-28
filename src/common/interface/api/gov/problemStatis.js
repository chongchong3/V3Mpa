import axios from '../../axios.decoration'

export const findList = params => axios.get('/gov/problemCount/findList', params);

// export const deleteEntLable = params => axios.postForm('/gov/import/deleteEntLable', params);


