import {makeRequest} from "./requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const socketTask = store.state.websocketMessageData.websocketMessage.noticeSocket;

/**
 * 分页获取商品列表
 * @return {Promise<unknown>}
 */
export const listProductsByPageUsingPost = (data= {
    current: "",
    pageSize: "",
    price: "",
    productDescription: "",
    productId: "",
    productName: "",
    productType: "",
    shelfTime: "",
    sortField: "",
    sortOrder: "",
    stock_quantity: "",
    updateTime: "",
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/products/list/page/vo`, 'POST', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("分页获取商品列表请求错误:" + error.message);
            reject(error)
        })
    });
}
