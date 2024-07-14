import {makeRequest} from "./requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const socketTask = store.state.websocketMessageData.websocketMessage.noticeSocket;

/**
 * 分页获取公告封装的信息
 * @return {Promise<unknown>}
 */
export const listAnnouncementsVoByPageUsingPost = (data= {}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/announcements/list/page/vo`, 'POST', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("分页获取公告信息请求错误:" + error.message);
            reject(error)
        })
    });
}
