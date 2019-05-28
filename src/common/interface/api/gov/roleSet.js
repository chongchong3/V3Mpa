import axios from "../../axios.decoration"

export const getRoleList = (params) => axios.get('/sys/roleList', params);

export const delRole = (params) => axios.get('/sys/deleteRole', params);


export const getRolePermission = params => axios.get('/sys/getRolePermission', params);
export const getPermissionByRank = params => axios.get('/sys/permissionList', params);

export const addRole = params => axios.get('/sys/addRole', params);
export const modifyRole = params => axios.get('/sys/modifyRole', params);
