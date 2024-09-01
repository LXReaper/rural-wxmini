<template>
  <view class="title">
    {{notices[0].title }}
  </view>
  <view class="content" >
    {{notices[0].content}}
  </view>
  <view class="meta">
    <view class="sender">{{ notices[0].user_name }}</view>
    <view class="time">{{ formatDate(notices[0].publish_date) }}</view>
  </view>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {onLoad} from "@dcloudio/uni-app";
import {makeRequest} from "../../utils/request/requestUtil";
import {store} from "../../store";
import moment from "moment";
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const id = ref('');
const current = ref(1);
const notices = ref([]);
const formatDate = (date) => {
  return moment(date).format("YYYY年MM月DD日");
};

onLoad((options)=>{
  try {
    id.value = JSON.parse((decodeURIComponent(options.id || '[]')))
  }catch (e){
    console.log("error",error.message)
  }
})
const handleSearch = async () => {
  try {
    const res = await makeRequest(`${backendBaseInfo}/api/management/notices/list/page/vo`, 'POST', {
      current: current.value,
      user_id: store.state.user.loginUser.villager_id,
      id:id.value,
    });

    if (res.data.code === 0) {
      notices.value = res.data.data.records;
      console.log("查询成功！");
      console.log(notices.value);
    }
  } catch (error) {
    console.log("请求失败", error.message);
  }
};
onMounted(()=>{
  handleSearch();
})
</script>


<style scoped lang="scss">
.title{
 /* padding-left: 50rpx;*/
  font-size: 70rpx;
  font-weight: bold;
}
.content{
  padding-left: 50rpx;
  padding-right: 50rpx;
  font-size: 45rpx;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.meta {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.sender {
  font-weight: 500;
  flex-shrink: 0; /* 防止名字被压缩 */
}

.time {
  font-weight: 400;
  flex-shrink: 1; /* 允许日期被压缩 */
  text-align: right; /* 确保日期右对齐 */
  white-space: nowrap; /* 防止日期换行 */
  overflow: hidden; /* 隐藏溢出部分 */
  text-overflow: ellipsis; /* 使用省略号表示溢出文本 */
}
</style>
