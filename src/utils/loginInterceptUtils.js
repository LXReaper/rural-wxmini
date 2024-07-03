import {readStorageData} from "./storage/storageUtils";
import {store} from "../store";
import {getLoginUser} from "./request/userServicesUtils";

export const loginIntercept = async (path) => {
    // console.log(path);
    const res = await getLoginUser();
    if (res.data.code !== 0) reLoadPage();
    // console.log(res.data.data);
}


const reLoadPage = () => {
    //返回登录页面
    wx.reLaunch({
        url: '/pages/login/login'
    });
}
