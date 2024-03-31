// util.js

// 时间格式化
function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 网络请求
function request(url, data, method, header = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: function (res) {
                resolve(res.data)
            },
            fail: function (error) {
                reject(error)
            }
        })
    })
}

module.exports = {
    formatTime: formatTime,
    request: request
}