/**
 * 异步请求后端接口的工具函数
 * @param url 请求后端地址
 * @param method
 * @param data
 * @return {Promise<unknown>}
 */
export const makeRequest = (url, method, data) => {
    let cookie = wx.getStorageSync("cookie")//读取cookie
    let mustCookie = !String(cookie).startsWith("SESSION=;");
    let header = mustCookie ?
        {
            'content-type': 'application/json',
            'cookie': cookie
        } : {
            'content-type': 'application/json',
        }
    // 实现请求逻辑，这里使用uni.request替代范例中的this.$request
    return new Promise((resolve, reject) => {
        uni.request({
            url: url,
            method: method,
            header: header,
            data: data,
            withCredentials: mustCookie,
            success: res => resolve(res),//返回正确响应数据
            fail: err => reject(err)//返回错误响应数据
        });
    });
}

export const getCode = (provider) => {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: provider,
            success: logRes => resolve(logRes),//返回正确响应数据
            fail: error => reject(error)//返回错误响应数据
        });
    });
};
