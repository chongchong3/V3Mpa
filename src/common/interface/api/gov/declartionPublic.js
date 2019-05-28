import axios from '../../axios.decoration'
//列表
export const getDeclareResultList = params => axios.get('/api/projectDeclare/getDeclareResultList', params);
//删除
export const deleteDeclareResult = params => axios.get('/api/projectDeclare/deleteDeclareResult', params);

//关联政策
export const getAssociatedPolicy = params => axios.get('/api/projectDeclare/getAssociatedPolicy', params);
// 上传接口
export const uploadFile ='/api/projectDeclare/upload'


//提交表单
export const insertDeclareResult = params => axios.postForm('/api/projectDeclare/insertDeclareResult', params);
//编辑灰显
export const getOneDeclareResult = params => axios.get('/api/projectDeclare/getOneDeclareResult', params);



//详情
export const getDecalreResultDetail = params => axios.get('/api/projectDeclare/getDecalreResultDetail', params);
// 预览
export const previewOnHtml = params => axios.get('/api/projectDeclare/previewOnHtml', params);

