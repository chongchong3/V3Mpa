//退出登陆接口统一配置
import axios from "../axios.decoration";

export const logout = params => axios.get('/user/logout', params);
