import {store} from "../../store";
import checkAuthority from "../../access/checkAuthority";
import AuthorityCtrl from "../../access/authorityCtrl";

/**
 * 读取本地缓存的用户数据 和 将用户数据写入本地缓存
 */
export function readStorageData() {
    wx.getStorage({
        key: 'userInfo',
        success: function (res) {
            store.dispatch("user/getLoginUser", res.data).then(r => {
                console.log('读取数据成功', res.data);
                if (checkAuthority(store.state.user.loginUser, AuthorityCtrl.USER)) {
                    uni.switchTab({
                        url: "/pages/index/index"
                    });
                }
            });
        },
        fail: function (res) {
            console.log('读取数据失败');
        },
    });
}

export function setStorageData(userData){
    wx.setStorage({
        key: 'userInfo', // 设置一个键名
        data: {
            villager_id: userData.value.villager_id,
            villager_name: userData.value.villager_name,
            avatar: userData.value.avatar,
            userRole: userData.value.userRole,
            phone_number: userData.value.phone_number,
            miniOpenId: userData.value.miniOpenId,
            address: userData.value.address,
            introduction: userData.value.introduction,
        },
        success: function () {
            console.log('数据保存成功');
            // 从本地存储中读取数据
            readStorageData();
            //跳转到主页
            uni.switchTab({
                url: "/pages/index/index"
            });
        },
    });
}
