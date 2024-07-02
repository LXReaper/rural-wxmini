import {store} from "../../store";
import checkAuthority from "../../access/checkAuthority";
import AuthorityCtrl from "../../access/authorityCtrl";
import {getLoginUser} from "../request/userServicesUtils";

/**
 * 读取本地缓存的用户数据 和 将用户数据写入本地缓存
 */
export function readStorageData(path = "/pages/index/index") {
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    // console.log(userInfo.expireTimeStamp + "ms  " + Date.now() + "ms");
    if (!userInfo) {
        userInfo = getLoginUser();
        return userInfo;
    }
    //获取后端的登录信息
    getLoginUser().then(res => {
        userInfo = res.data.data;
        if (res.data.code !== 0) {
            wx.removeStorage({key: 'userInfo'});
            console.log('用户信息数据已过期，已清除');
            return userInfo;
        } else {
            store.dispatch("user/getLoginUser", userInfo).then(r => {
                console.log('读取数据成功', userInfo);
                if (checkAuthority(store.state.user.loginUser, AuthorityCtrl.USER)) {
                    uni.switchTab({
                        url: path
                    }).then(r => {
                        console.log()
                    });
                }
            });
        }
        return userInfo;
    });
    // wx.getStorage({
    //     key: 'userInfo',
    //     success: function (res) {
    //         store.dispatch("user/getLoginUser", res.data).then(r => {
    //             console.log('读取数据成功', res.data);
    //             if (checkAuthority(store.state.user.loginUser, AuthorityCtrl.USER)) {
    //                 uni.switchTab({
    //                     url: "/pages/index/index"
    //                 });
    //             }
    //         });
    //     },
    //     fail: function (res) {
    //         console.log('读取数据失败');
    //     },
    // });
}

export function setStorageData(userData) {
    // wx.setStorageSync({
    //     key: 'userInfo', // 设置一个键名
    //     data: {
    //         villager_id: userData.value.villager_id,
    //         villager_name: userData.value.villager_name,
    //         avatar: userData.value.avatar,
    //         userRole: userData.value.userRole,
    //         phone_number: userData.value.phone_number,
    //         miniOpenId: userData.value.miniOpenId,
    //         address: userData.value.address,
    //         introduction: userData.value.introduction,
    //         expireTimeStamp: Date.now() + 3000,
    //     },
    //     success: function () {
    //         console.log('数据保存成功');
    //         // 从本地存储中读取数据
    //         readStorageData();
    //         //跳转到主页
    //         uni.switchTab({
    //             url: "/pages/index/index"
    //         });
    //     },
    // });
    try {
        wx.setStorageSync('userInfo', {
            villager_id: userData.value.villager_id,
            villager_name: userData.value.villager_name,
            avatar: userData.value.avatar,
            userRole: userData.value.userRole,
            phone_number: userData.value.phone_number,
            miniOpenId: userData.value.miniOpenId,
            address: userData.value.address,
            introduction: userData.value.introduction,
            expireTimeStamp: Date.now() + 15 * 1000,//设置过期时间1天
        });
    } catch (e) {
        console.error('存储数据失败:', e);
    }
    console.log('数据保存成功');
    // 从本地存储中读取数据
    readStorageData();
}
