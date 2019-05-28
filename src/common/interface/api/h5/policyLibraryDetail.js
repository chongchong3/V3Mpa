import axios from '../../axios.decoration'
export const policyDetail = params =>axios.get('/api/policyRead/policyDetail',params)

