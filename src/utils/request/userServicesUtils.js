import {makeRequest} from "./requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const socketTask = store.state.websocketMessageData.websocketMessage.noticeSocket;

/**
 * 获取当前登录用户信息
 * @param data
 * @returns {Promise<unknown>}
 */
export const getLoginUser = (data = {}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/user/get/login`, 'GET', data)
            .then(res => {
                // console.log(res.data.data)
                let cookie = res.header["Set-Cookie"];
                if (cookie && !String(cookie).startsWith("SESSION=;")) wx.setStorageSync("cookie", cookie);//存cookie信息
                if (res.data.code !== 0) wx.removeStorage({key: 'userInfo'});
                store.dispatch("user/getLoginUser", res.data.data)
                resolve(res);
            }).catch(error => {
            console.log("登录用户获取请求错误:" + error.message);
            reject(error)
        })
    });
}

/**
 * 注册用户
 * @param data
 * @returns {Promise<unknown>}
 */
export const registerUser = (data = {
    userAccount: "",
    userPassword: "",
    checkPassword: "",
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/user/register`, 'POST', data)
            .then(res => {
                if (res.data.code !== 0) {
                    reject(res)
                }
                resolve(res);
            }).catch(error => {
            console.log("用户注册请求错误:" + error.message);
            reject(error)
        })
    });
}

/**
 * 绑定微信号
 * @param data
 * @returns {Promise<unknown>}
 */
export const bindWeChatUser = (data = {
    userId: wx.getStorageSync('userInfo').villager_id,
    code: '',
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/user/bind/miniOpenId`, 'POST', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("用户绑定微信请求错误:" + error.message);
            reject(error)
        })
    });
}

/**
 * 用户账号密码登录
 * @param data
 * @returns {Promise<unknown>}
 */
export const userLoginUsingPost = (data = {
    userAccount: "",
    userPassword: ""
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/user/login`, 'POST', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("用户登录请求错误:" + error.message);
            reject(error)
        })
    });
}

/**
 * 退出登录
 * @param data
 * @returns {Promise<unknown>}
 */
export const loginOut = (data = {}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/user/logout`, 'POST', data)
            .then(res => {
                // console.log(res.data.data)
                if (res.data.code === 0) {
                    // 删除本地数据
                    wx.removeStorage({key: 'userInfo'});
                    // 删除vuex数据
                    store.dispatch("user/getLoginUser", null);
                    //返回登录页面
                    wx.reLaunch({
                        url: '/pages/login/login'
                    });
                }
                resolve(res);
            }).catch(error => {
            console.log("登录用户获取请求错误:" + error.message);
            reject(error)
        })
    });
}
