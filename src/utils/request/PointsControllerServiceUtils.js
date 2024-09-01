import {makeRequest} from "./requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];

/**
 * 根据用户id查询剩余积分
 * @return {Promise<unknown>}
 */
export const getRemainingPointsByUserIdUsingGet = (data= {
    userId: "",
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/user/points/get/RemainingPoints`, 'GET', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("剩余积分查询请求错误:" + error.message);
            reject(error)
        })
    });
}
