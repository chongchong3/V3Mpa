import axios from '../../axios.decoration'

//工商登记信息
export const queryEnt = (params) => {
    return axios.get('/gov/entData/queryEnt', params);
}
export const queryEntSql = (params) => {
    return axios.get('/gov/entData/queryEntSql', params);
}
//获取年份
export const showYear = (params) => {
    return axios.get('/gov/selfCheck/showYear', params);
}

//经营数据
export const showManagementData = (params) => {
    return axios.get('/gov/entData/showManagementData', params);
}
/**亩均指标*/
//   export const showManagementData = (params)=>{
//     return axios.get('/gov/entData/showManagementData',params);
//  }

/**土地数据*/
export const showLandData = (params) => {
    return axios.get('/gov/entData/showLandData', params);
}

/**税务数据*/
export const showTaxData = (params) => {
    return axios.get('/gov/entData/showTaxData', params);
}

/**统计数据*/
export const staticsData = (params) => {
    return axios.get('/gov/entData/staticsData', params);
}
/**用水数据*/
export const showWaterData = (params) => {
    return axios.get('/gov/entData/showWaterData', params);
}
/**用电数据*/
export const showElectricData = (params) => {
    return axios.get('/gov/entData/showElectricData', params);
}
/**排污数据*/
export const showEnvironmentData = (params) => {
    return axios.get('/gov/entData/showEnvironmentData', params);
}

/*最终持股人*/
export const getManyStockHolder = (params) => {
    return axios.get('/gov/entData/getManyStockHolder', params);
}

export const queryStockholder = (params) => {
    return axios.get('/gov/entData/queryStockholder', params);
}


export const oneLevelStockholder = (params) => {
    return axios.get('/gov/entData/oneLevelStockholder', params);
}

//知识产权-----专利信息
export const findPatentByEntName = (params) => {
    return axios.get('/gov/entData/findPatentByEntName', params);
}
//知识产权-----商标信息
export const findTrademarkByEntName = (params) => {
    return axios.get('/gov/entData/findTrademarkByEntName', params);
}
//知识产权-----软件著作权
export const findSoftCopyrightByEntName = (params) => {
    return axios.get('/gov/entData/findSoftCopyrightByEntName', params);
}
//知识产权-----著作权
export const findCopyrightByEntName = (params) => {
    return axios.get('/gov/entData/findCopyrightByEntName', params);
}
//知识产权-----域名  //司法诉讼-----开庭公告 裁判文书  法院公告
export const findDomainByEntName = (params) => {
    return axios.get('/gov/entData/findDomainByEntName', params);
}

//工商登记信息
// export const queryEnt = (params) => {
//     return axios.get('/gov/entData/queryEnt', params);
// }

//司法诉讼-----开庭公告 裁判文书  法院公告
export const findSfByEntName = (params) => {
    return axios.get('/gov/entData/findSfByEntName', params);
}








