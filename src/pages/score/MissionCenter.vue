<template>
  <view class="container">
    <view class="action-buttons">
      <button class="action-button" @click="handleButtonOneClick">按钮一</button>
      <button class="action-button" @click="handlePublishTask">发布任务</button>
    </view>
    <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入任务关键词" clear-button="auto" cancelButton="none"
                    @confirm="searchTask" v-model="searchText"></uni-search-bar>
    <view class="task-list">
      <view class="task-card" v-for="(task, i) in tasks" :key="i">
        <text class="task-content">任务内容：{{ task.task_content }}</text>
        <text class="task-end-time">截至时间：{{ moment(task.deadline).format("YYYY年MM月DD日") }}</text>
        <text class="task-category">积分：{{ task.points_value }}</text>
        <button class="claim-button" @click="handleClaimTask(task.task_id)">领取任务</button>
      </view>
    </view>
    <text style="cursor: pointer" v-if="tasks.length < total" @click="showMoreData">显示更多
    </text>
  </view>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {makeRequest} from "../../utils/request/requestUtil";
import {store} from "../../store";
import UniSearchBar from "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue";
import moment from "moment";
import {onPageScroll} from "@dcloudio/uni-app";
import {listTasksVoByPageUsingPost} from "../../utils/request/TasksControllerServiceUtils";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const tasks = ref([]);
const searchText = ref('');
const addSizeValue = 10;
const total = ref(0)
const current = ref(1);
const pageSize = ref(10);
const sortOrder = ref('desc');

// 处理按钮点击事件
function handleButtonOneClick() {
  console.log('按钮一被点击');
}

// 处理发布任务按钮点击事件
function handlePublishTask() {
  console.log('发布任务按钮被点击');
  uni.navigateTo({
    url: "/pages/score/releaseTasks"
  })
}

// 处理搜索框输入
const handleSearch = async () => {
  await listTasksVoByPageUsingPost({
    current: current.value,
    pageSize: pageSize.value,
    sortOrder: sortOrder.value,
    taskContent: searchText.value
  }).then((res) => {
    if (res.data.code === 0) {
      tasks.value = res.data.data.records;
      total.value = res.data.data.total;
      console.log("查询成功！");
    }
  }).catch((error) => {
    console.log("请求失败", error.message)
  })
}
onMounted(() => {
  handleSearch();
})
const searchTask = () => {
  current.value = 1;
  handleSearch();
}

// 处理任务点击事件
function handleTaskClick(taskId) {
  console.log('Task clicked with id:', taskId);
}

// 处理领取任务按钮点击事件
function handleClaimTask(taskId) {
  console.log('Task claimed with id:', taskId);
}

//显示更多任务数据
const showMoreData = () => {
  pageSize.value += addSizeValue;
  handleSearch();
}

// onPageScroll((e) =>{
//   console.log(e)
// })
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-buttons {
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.action-button {
  flex: 1;
  margin-right: 10px;
  background: #6cb4f7; /* 柔和蓝 */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}
.action-button :hover{
  background: #5a9bd7;
}

.search-box {
  width: 90%;
  margin-top: 20px;
}

.task-list {
  width: 90%;
  margin-top: 20px;
}

.task-card {
  background: rgba(255, 255, 255, 0.3); /* 半透明背景 */
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px); /* 毛玻璃效果 */
  text-align: center;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
}

.task-content, .task-end-time, .task-category {
  margin: 5px 0;
}

.claim-button {
  margin-top: 10px;
  margin-left: 70%;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
</style>
