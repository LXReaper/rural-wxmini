<template>
  <NoticePage
      v-for="(notice, index) in notices"
      :key="index"
      :title="notice.title"
      :content="notice.content"
      :sender="notice.sender"
      :time="notice.time"
  />
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {store} from '../../store';
import NoticePage from "../../components/NoticePage.vue";
import {onShow} from "@dcloudio/uni-app";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const socketTask = store.getters['websocketMessageData/getNoticeSocket'];
const notices = ref([
  {
    title: "lqj",
    content: "cf",
    sender: "lqj",
    time: "2024"

  }
]); // 初始化 notices 数组

/**
 * 接收服务器的消息
 */
socketTask.onMessage((res) => {
  console.log('Message received:', res);
  // 处理接收到的消息
  const newNotice = JSON.parse(res.data);
  notices.value.push(newNotice);
  console.log('Parsed data:', newNotice);
});
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
/* 你的样式 */
</style>
