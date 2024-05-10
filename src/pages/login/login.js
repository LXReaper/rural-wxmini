// wx.login({
//     success(res) {
//         if (res.code) {
//             //发起网络请求
//             wx.request({
//                 url: 'http://localhost:8121/api/user/login',
//                 data: {
//                     code: res.code
//                 }
//             })
//         } else {
//             console.log('登录失败！' + res.errMsg)
//         }
//     }
// })
