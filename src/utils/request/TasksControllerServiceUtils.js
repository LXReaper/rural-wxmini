import {makeRequest} from "./requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];

/**
 * 分页获取任务信息封装列表
 * @return {Promise<unknown>}
 */
export const listTasksVoByPageUsingPost = (data= {
    all_Num: "",
    current: "",
    deadLine: "",
    join_Num: "",
    materialId: "",
    pageSize: "",
    pointsValue: "",
    publishDate: "",
    ruleId: "",
    sortField: "",
    sortOrder: "",
    taskContent: "",
    taskId: "",
    updateDate: "",
    updateUserName: "",
    userName: "",
}) => {
    return new Promise((resolve, reject) => {
        makeRequest(`${backendBaseInfo}/api/tasks/list/page/vo`, 'POST', data)
            .then(res => {
                resolve(res);
            }).catch(error => {
            console.log("分页获取任务信息请求错误:" + error.message);
            reject(error)
        })
    });
}
