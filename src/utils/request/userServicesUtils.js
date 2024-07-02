import {makeRequest} from "./requestUtil";
import {store} from "../../store";
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
export const getLoginUser = () =>{
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/user/get/login`,'GET',{})
            .then(res =>{
                // console.log(res.data.data)
                resolve(res);
            }).catch(error =>{
                console.log("登录用户获取失败:" + error.message);
                reject(error)
            })
    });
}

