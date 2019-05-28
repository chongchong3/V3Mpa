import axios from '../../axios.decoration'
//项目申报录入列表
export const getProjectDeclareList = params => axios.get('/api/projectDeclare/getProjectDeclareList', params);
//下拉框数据
export const getSelect = params => axios.get('/api/projectDeclare/getSelect', params);
//数据列表删除
export const deleteProjectDeclare = params => axios.get('/api/projectDeclare/deleteProjectDeclare', params);



//编辑灰显
export const getOneProjectDeclare = params => axios.get('/api/projectDeclare/getOneProjectDeclare', params);
//关联政策
export const getAssociatedPolicy = params => axios.get('/api/projectDeclare/getAssociatedPolicy', params);
//预览
export const previewOnHtml = params => axios.get('/api/projectDeclare/previewOnHtml', params);

// 上传接口
export const uploadFile ='/api/projectDeclare/upload'

//提交数据
export const insertDeclareInformation = params => axios.postForm('/api/projectDeclare/insertDeclareInformation', params);


//申报指南
export const getProjectDeclareDetail = params => axios.get('/api/projectDeclare/getProjectDeclareDetail', params);
