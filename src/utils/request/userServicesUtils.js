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
