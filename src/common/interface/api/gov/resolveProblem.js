import axios from '../../axios.decoration'

//获取流转部门列表数据
export const getTownDepartmentList = () => axios.get('problem/townDepartmentList');
/**
 *  获取详情数据
 *  @param problemId 问题ID
 * */
export const problemDetail = (params) => axios.get('problem/problemDetail', params);

/**
 * 处理问题
 * @param problemId 问题id
 * @param handlerStatus 处理状态：5、继续流转，6、无法处理，7、派单退回，8、已解决，9、稍后处理
 * @param nextDepartmentId  如果选择继续流转，流转到的部门id
 * @param  opinion 处理意见
 * */
export const handlerProblem = (params) => axios.get('problem/handlerProblem', params);


/**
 * 督办问题
 * @param problemId 问题id
 * @param leaderOpinion 督办意见
 * @param leaderDepartment  督办允许部门查看：0、不允许，1、允许
 * @param  leaderCompany 督办允许企业查看: 0、不允许，1、允许
 * */
export const problemSupervise = (params) => axios.get('problem/problemSupervise', params);
