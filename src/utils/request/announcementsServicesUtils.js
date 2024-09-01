import {makeRequest} from "./requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];

/**
 * 分页获取公告封装的信息
 * @return {Promise<unknown>}
 */
export const listAnnouncementsVoByPageUsingPost = (data= {
    announcement_id: "",
    announcement_type: "",
    content: "",
    current: "",
    image_url: "",
    pageSize: "",
    sortField: "",
    sortOrder: "",
    title: "",
    updated_user_name: "",
    user_name: "",
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/management/announcements/list/page/vo`, 'POST', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("分页获取公告信息请求错误:" + error.message);
            reject(error)
        })
    });
}
