import {readStorageData} from "./storage/storageUtils";
import {store} from "../store";

export const loginIntercept = (path) => {
    const userInfo = readStorageData(path);
    if (!userInfo || !userInfo?.villager_id) {
        reLoadPage();
    }
}


const reLoadPage = () =>{
    wx.navigateTo({
        url: '/pages/login/login'
    });
}
