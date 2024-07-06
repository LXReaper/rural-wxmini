<template>
  <NoticePage
      v-for="(notice, index) in notices"
      :key="index"
      :title="notice.title"
      :content="notice.content"
      :sender="notice.user_name"
      :time="formatDate(notice.publish_date)"
  />
</template>

<script setup>
import {onMounted, ref} from 'vue';
import NoticePage from "../../components/NoticePage.vue";
import {makeRequest} from "../../utils/request/requestUtil";
import {store} from "../../store";
import moment from "moment/moment";
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const socketTask = store.getters['websocketMessageData/getNoticeSocket'];
const current = ref(1);
const pageSize = ref(50);
const sortOrder = ref('desc');
const notices = ref([]); // 初始化 notices 数组

/**
 * 格式化日期
 * @param date
 * @returns {string}
 */
const formatDate = (date) => {
  return moment(date).format("YYYY年MM月DD日");
};

/**
 * 接收服务器的消息
 */
socketTask.onMessage((res) => {
  console.log('Message received:', res);
  // 处理接收到的消息
  let newNotice;
  try {
    console.log(res.data);
    newNotice = JSON.parse(res.data);
    notices.value.unshift(newNotice); // 将新消息插入到数组开头
  } catch (e) {
    console.error('Failed to parse message:', e);
  }
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

const handleSearch = async () => {
  await makeRequest(`${backendBaseInfo}/api/notices/list/page/vo`, 'POST', {
    current: current.value,
    pageSize: pageSize.value,
    sortOrder: sortOrder.value,
    user_id: store.state.user.loginUser.villager_id,
  }).then((res) => {
    if (res.data.code === 0) {
      notices.value = res.data.data.records.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
      console.log("查询成功！");
    }
  }).catch((error) => {
    console.log("请求失败", error.message)
  })
}

onMounted(() => {
  handleSearch();
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
