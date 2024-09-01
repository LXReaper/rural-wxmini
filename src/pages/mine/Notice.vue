<template>
  <view class="top">
    <input class="searchValue" placeholder="请输入搜索内容">
    <button class="searchButton" @click="handleSearch">搜索</button>
  </view>
  <view style="font-weight: bold; font-size: 40rpx">{{ formatDate(notices.publish_date) }}</view>
  <view class="content">
    <template v-if="notices.today.length">
      <view class="tate">今天</view>
      <view v-for="(notice, index) in notices.today" :key="'today-' + index" class="notice" @click="toNoticeDetail(notice.id)">
        <view class="text">{{ notice.title }}</view>
      </view>
    </template>

    <template v-if="notices.yesterday.length">
      <view class="tate">昨天</view>
      <view v-for="(notice, index) in notices.yesterday" :key="'yesterday-' + index" class="notice" @click="toNoticeDetail(notice.id)">
        <view class="text">{{ notice.title }}</view>
      </view>
    </template>

    <template v-if="notices.beforeThreeDays.length">
      <view class="tate">三天前</view>
      <view v-for="(notice, index) in notices.beforeThreeDays" :key="'beforeThreeDays-' + index" class="notice" @click="toNoticeDetail(notice.id)">
        <view class="text">{{ notice.title }}</view>
      </view>
    </template>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { makeRequest } from '../../utils/request/requestUtil';
import { store } from '../../store';
import moment from "moment/moment";
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const socketTask = store.getters['websocketMessageData/getNoticeSocket'];
const current = ref(1);
const pageSize = ref(60);
const sortOrder = ref('desc');
const notices = ref({
  today: [],
  yesterday: [],
  beforeThreeDays: []
});

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

    // 假设接收到的消息是一个单独的通知对象
    // 如果接收到的是通知列表，则需要根据实际情况修改
    if (Array.isArray(newNotice)) {
      newNotice.forEach(notice => {
        processNewNotice(notice);
      });
    } else {
      processNewNotice(newNotice);
    }

  } catch (e) {
    console.error('Failed to parse message:', e);
  }
});

/**
 * 处理新收到的通知
 * @param {Object} notice - 新的通知对象
 */
const processNewNotice = (notice) => {
  // 将新通知合并到现有的通知列表中
  const allNotices = [
    notice,
    ...notices.value.today,
    ...notices.value.yesterday,
    ...notices.value.beforeThreeDays
  ];

  // 重新分类通知
  categorizeNotices(allNotices);
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

/**
 * 按日期分类通知
 * @param {Array} noticeList - 通知列表
 */
const categorizeNotices = (noticeList) => {
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');

  // 对通知列表按发布日期降序排序
  noticeList.sort((a, b) => moment(b.publish_date).diff(moment(a.publish_date)));

  notices.value = {
    today: [],
    yesterday: [],
    beforeThreeDays: []
  };

  noticeList.forEach(notice => {
    const noticeDate = moment(notice.publish_date);
    if (noticeDate.isSame(today, 'day')) {
      notices.value.today.push(notice);
    } else if (noticeDate.isSame(yesterday, 'day')) {
      notices.value.yesterday.push(notice);
    } else {
      notices.value.beforeThreeDays.push(notice);
    }
  });

  console.log('分类后的通知:', notices.value);
};
const handleSearch = async () => {
  try {
    const res = await makeRequest(`${backendBaseInfo}/api/management/notices/list/page/vo`, 'POST', {
      current: current.value,
      pageSize: pageSize.value,
      sortOrder: sortOrder.value,
      user_id: store.state.user.loginUser.villager_id,
    });

    if (res.data.code === 0) {
      const sortedNotices = res.data.data.records.sort((a, b) =>
          moment(b.publish_date).diff(moment(a.publish_date))
      );
      categorizeNotices(sortedNotices);
      console.log("查询成功！");
    }
  } catch (error) {
    console.log("请求失败", error.message);
  }
};

onMounted(()=>{
  handleSearch();
});

const toNoticeDetail =(id)=>{
  uni.navigateTo({
    url:`/pages/mine/noticeDetail?id=${encodeURIComponent(JSON.stringify(id))}`
  })
  console.log(id);
}
const formatDate = (date) => {
  return moment(date).format("YYYY年");
};
</script>

<style scoped lang="scss">
.top {
  display: flex;
  margin: 20rpx;

}
.searchValue{
  height: 70rpx;
  width: 550rpx;
  padding-left: 10rpx;
  margin-right: 20rpx;
  border-radius: 30rpx;
  box-shadow: 1px 1px 1px 1px #aaa;
}
.searchButton {
  text-align: center;
  height: 70rpx;
  width: 130rpx;
  line-height: 70rpx;
  border-radius: 30rpx;
  background-color: red;
  color: #FFFFFF;
  font-size: 31rpx;
}
.content {
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
}
.content .tate {
  margin: 20rpx;
  font-weight: bold;
  color: red;
}
.content .notice {
  margin-top: 20rpx;
  height: 110rpx;
  width: 630rpx;
  background-color: #fff;
  border-radius: 30rpx;
}
.content .notice .text {
  font-weight: bold;
/*  color: red;*/
  padding:10rpx 0 0 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.dialog-content {
  /* 整体内容的样式 */
  padding: 20px;
  font-family: Arial, sans-serif;
}

.dialog-title {
  /* 通知标题样式 */
  font-size: 24px; /* 加大字体 */
  font-weight: bold; /* 加粗 */
  margin-bottom: 10px;
}

.dialog-message {
  /* 通知内容样式 */
  font-size: 16px; /* 正常字体 */
  margin-bottom: 20px;
}

.dialog-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px; /* 小字体 */
  color: #888; /* 淡色 */
}

.dialog-sender, .dialog-time {
  /* 发件人和时间样式 */
  font-size: inherit;
  color: inherit;
}
</style>
