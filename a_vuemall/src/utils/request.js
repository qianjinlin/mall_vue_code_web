
import defaultSetting from './defaultSetting';
import Axios from '../utils/http'
/**
 * 登录请求
 */
export function getUserLogin(url, params) {
    return Axios.post(defaultSetting.BaseURL + url, {
        username: params.username,
        password: params.password
    })
}

/**
 * 退出登录
 */
export function LoginOut(url, params) {
    return Axios.post(defaultSetting.BaseURL + url, {
        token: params.token
    })
}