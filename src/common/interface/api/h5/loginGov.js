import axios from '../../axios.decoration'

export const login = params => axios.postForm('/user/login', params);