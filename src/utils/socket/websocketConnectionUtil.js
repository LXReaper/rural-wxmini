import {store} from "../../store";
import {websocketMessageData} from "../../store/websocketMessageData/websocketMessageData";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const socketTask = store.state.websocketMessageData.websocketMessage.noticeSocket;
//const socketTask = store.getters['websocketMessageData/getNoticeSocket']
/**
 * 初始化websocket
 */
export const initWebSocket = () => {
    store.dispatch("websocketMessageData/setNoticeSocket",
        wx.connectSocket({
            url: `ws://${backendBaseInfo.substring(7)}/api/sendNotices`,
            header: {
                'content-type': 'application/json',
                'cookie': wx.getStorageSync("cookie") // 读取cookie
            },
            success: () => {
                console.log('websocket 成功连接');
            },
            fail: (err) => {
                console.error('WebSocket 连接失败:', err);
            }
        })
    )
        .then(r => {})
        .catch(error => {
            console.log("初始化错误," + error)
        })
};
/**
 * 接收消息
 */
export const receiveMessage = () =>{
    // 接收消息
    socketTask.onMessage((res) => {
        console.log('Message received:', res);
        // 处理接收到的消息
        const data = JSON.parse(res.data);
        console.log('Parsed data:', data);
    });
}
