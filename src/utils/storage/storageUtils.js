import {store} from "../../store";
import checkAuthority from "../../access/checkAuthority";
import AuthorityCtrl from "../../access/authorityCtrl";
import {getLoginUser} from "../request/userServicesUtils";

/**
 * 读取本地缓存的用户数据 和 将用户数据写入本地缓存
 */
export async function readStorageData(path = "/pages/index/index") {
    return await new Promise((resolve, reject) => {
        let userInfo = wx.getStorageSync('userInfo');
        console.log("本地用户数据"+userInfo);
        // console.log(userInfo.expireTimeStamp + "ms  " + Date.now() + "ms");
        //获取后端的登录信息
        getLoginUser().then(res => {
            userInfo = res.data.data;
            if (res.data.code === 0) {
                // 存本地
                recordDataLocation(userInfo);
                // 存Vuex
                recordDataVuex(userInfo, path);
            } else {
                // 删除本地数据
                wx.removeStorage({key: 'userInfo'});
                // 删除vuex数据
                store.dispatch("user/getLoginUser", null);
                console.log('用户信息数据已过期，已清除');
            }
            resolve(userInfo);
        });
    })
}

/**
 * 持久化数据
 * @param userData
 */
export function setStorageData(userData) {
    try {
        recordDataLocation(userData.value);
    } catch (e) {
        console.error('存储数据失败:', e);
    }
    console.log('数据保存成功');
    // 从本地存储中读取数据
    readStorageData();
}

/**
 * 记录数据到Vuex
 * @param userInfo
 * @param path
 */
const recordDataVuex = (userInfo, path) => {
    // 存vuex
    store.dispatch("user/getLoginUser", userInfo).then(r => {
        console.log('读取数据成功', userInfo);
        if (checkAuthority(store.state.user.loginUser, AuthorityCtrl.USER)) {
            console.log(path)
            uni.switchTab({
                url: path
            }).then(r => {
                console.log()
            });
        }
    });
}
/**
 * 记录数据到本地
 * @param userInfo
 */
const recordDataLocation = (userInfo) => {
    wx.setStorageSync('userInfo', {
        villager_id: userInfo.villager_id,
        villager_name: userInfo.villager_name,
        avatar: userInfo.avatar,
        userRole: userInfo.userRole,
        phone_number: userInfo.phone_number,
        miniOpenId: userInfo.miniOpenId,
        address: userInfo.address,
        introduction: userInfo.introduction,
        expireTimeStamp: Date.now() + 15 * 1000,//设置过期时间1天
    });
}
