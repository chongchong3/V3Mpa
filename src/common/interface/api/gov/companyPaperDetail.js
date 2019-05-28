import axios from '../../axios.decoration'

export const getBussiness = (params) => {
    return axios.get('/gov/selfCheck/businessData', params);
}

export const getPollution = (params) => {
    return axios.get('/gov/selfCheck/showEnvironmentData', params)
}

export const showErro = (params) => {
    return axios.get('/gov/selfCheck/showErro', params)
}

export const townUnPass = (params) => {
    return axios.get('/gov/selfCheck/townUnPass', params)
}
export const townPass = (params) => {
    return axios.get('/gov/selfCheck/townPass', params)
}
export const getLandData = (params) => {
    return axios.get('/gov/selfCheck/showlandData', params)
}

export const getOperateData = (params) => {
    return axios.get('/gov/selfCheck/showManagemnetData', params)
}

export const getTaxData = (params) => {
    return axios.get('/gov/selfCheck/showTaxData', params)
}

export const getTotalData = (params) => {
    return axios.get('/gov/selfCheck/staticsData', params)
}

export const getWaterData = (params) => {
    return axios.get('/gov/selfCheck/showWaterData', params)
}

export const getElectricData = (params) => {
    return axios.get('/gov/selfCheck/showElectricData', params)
}

export const showApartment = (params) => { //咨询部门
    return axios.get('/gov/selfCheck/showApartment', params)
}

export const getListCodeEntName = (params) => {
    return axios.get('/gov/selfCheck/findEntDataByLike', params)
}

export const getListWaterEntName = (params) => {
    return axios.get('/gov/selfCheck/findWaterNum', params)
}

export const getListElecticEntName = (params) => {
    return axios.get('/gov/selfCheck/findElectricNum', params)
}
export const showComplain = (params) => {
    return axios.get('/gov/selfCheck/showComplain', params)
}
export const refillIn = (params) => {
    return axios.get('/gov/selfCheck/refillIn', params)
}

export const getConfirm = (params) => {
    return axios.postForm('/gov/import/confirm', params)
}
export const updateOraddManagementData = (params) => {
    return axios.postForm('/gov/selfCheck/updateOraddManagementData', params)
}
export const updateRentLand = (params) => {
    return axios.request({
        url: '/gov/selfCheck/updateRentLand',
        params,
        emulateJSON: false
    })
}
export const insertLandImg = (params)=>{
    return axios.postForm('/gov/selfCheck/insertLandImg', params)
}

export const updateOrAddTaxData = (params) => {
    return axios.request({
        url: '/gov/selfCheck/updateOrAddTaxData',
        params,
        emulateJSON: false
    })
    
}
export const updateOrAddStaticsData = (params) => {
    return axios.request({
        url: '/gov/selfCheck/updateOrAddStaticsData',
        params,
        emulateJSON: false
    })
    
}
export const updateInputLandData = (params) => {
    return axios.request({
        url: '/gov/selfCheck/updateInputLandData',
        params,
        emulateJSON: false
    })
    
}
export const addWaterUsed = (params) => {
    return axios.request({
        url: '/gov/selfCheck/addWaterUsed',
        params,
        emulateJSON: false
    })
    
}
export const addElectricData = (params) => {
    return axios.request({
        url: '/gov/selfCheck/addElectricData',
        params,
        emulateJSON: false
    })
    
}
export const reject = (params) => {
    return axios.request({
        url: '/gov/selfCheck/reject',
        params,
        emulateJSON: false
    })
    
}

export const updateOrAddEnvironmentData = (params) => {
    return axios.request({
        url: '/gov/selfCheck/updateOrAddEnvironmentData',
        params,
        emulateJSON: false
    })
    
}

export const toUpdate = (params) => {
    return axios.request({
        url: '/gov/selfCheck/toUpdate',
        params,
        emulateJSON: false
    })
    
}

export const insertRejectUpdate = (params) => {
    return axios.request({
        url: '/gov/selfCheck/insertRejectUpdate',
        params
    })
    
}
export const haveBeenReported = (params) => {
    return axios.get('/gov/selfCheck/haveBeenReported', params)
}
export const deleteRentOutLand = (params) => {
    return axios.get('/gov/selfCheck/deleteRentOutLand', params)
}
export const deleteRentInLand = (params) => {
    return axios.get('/gov/selfCheck/deleteRentInLand', params)
}
export const deleteWaterUsed = (params) => {
    return axios.get('/gov/selfCheck/deleteWaterUsed', params)
}
export const deleteElectricUsed = (params) => {
    return axios.get('/gov/selfCheck/deleteElectricUsed', params)
}
export const selectIndustry = (params) => {
    return axios.get('/gov/selfCheck/selectIndustry', params)
}



// check
export const complain = (params) => {
    return axios.request({
        url: '/gov/selfCheck/complain',
        params,
        emulateJSON: false
    })
    
}

