import {makeRequest} from "./requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];

/**
 * 生成订单
 * @return {Promise<unknown>}
 */
export const transactionsAddUsingPost = (data= {
    productId: [],//number
    transactionQuantity: [],//number
    user_id: "",
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/management/transactions/add`, 'POST', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("生成订单请求错误:" + error.message);
            reject(error)
        })
    });
}
