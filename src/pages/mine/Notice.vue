<template>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
/**
 * 连接websocket
 */
let socketTask = null;

const initWebSocket = () => {
  socketTask = wx.connectSocket({
    url: `ws://${backendBaseInfo.substring(7)}/api/sendNotices`,
    header: {
      'content-type': 'application/json',
      'cookie': wx.getStorageSync("cookie")//读取cookie
    },
    success: () => {
      console.log('websocket 成功连接');
    },
    fail: (err) => {
      console.error('WebSocket 连接失败:', err);
    }
  });

  //接收消息
  wx.onSocketMessage((res) => {
    console.log('来自服务器的消息:', res.data);
  });
};

/**
 * 向服务器发送消息
 * @param message
 */
const sendMessage = (message) => {
  if (socketTask) {
    socketTask.send({
      data: message
    });
  } else {
    console.error('WebSocket 连接没有建立.');
  }
};

onMounted(() => {
  initWebSocket();
});

/**
 * 关闭连接
 */
const onClose = () => {
  if (socketTask) {
    socketTask.close();
  }
};
</script>

<style scoped lang="scss">

</style>
