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
/**
 * 获取用户信息
 */
export function getUserInfo() {
    return Axios.post(defaultSetting.BaseURL + 'getAllUserInfo');
}

/**
 * 更新用户信息
 */
export function updateUser(params) {
    return Axios.post(defaultSetting.BaseURL + 'updateUser', {
        id: params.id,
        type: params.type
    });
}