<template>
  <view class="container">
    <view class="action-buttons">
      <button class="action-button" @click="handleButtonOneClick">按钮一</button>
      <button class="action-button" @click="handlePublishTask">发布任务</button>
    </view>
    <view class="search-box">
      <input v-model="searchText" placeholder="搜索任务" @input="handleSearch" />
    </view>
    <view class="task-list">
      <view class="task-card" v-for="task in tasks" :key="task.id" @click="handleTaskClick(task.id)">
        <text class="task-content">{{ task.content }}</text>
        <text class="task-end-time">{{ task.endTime }}</text>
        <text class="task-category">{{ task.category }}</text>
        <button class="claim-button" @click="handleClaimTask(task.id)">领取任务</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const tasks = ref([
  { id: 1, content: '完成项目报告', endTime: '2023-04-30', category: '工作' },
  { id: 2, content: '购买食材', endTime: '2023-04-25', category: '生活' },
  // 添加更多任务...
]);
const searchText = ref('');

// 处理按钮点击事件
function handleButtonOneClick() {
  console.log('按钮一被点击');
}

// 处理发布任务按钮点击事件
function handlePublishTask() {
  console.log('发布任务按钮被点击');
}

// 处理搜索框输入
function handleSearch() {
  // 实现搜索逻辑
}

// 处理任务点击事件
function handleTaskClick(taskId) {
  console.log('Task clicked with id:', taskId);
}

// 处理领取任务按钮点击事件
function handleClaimTask(taskId) {
  console.log('Task claimed with id:', taskId);
}
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
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.task-content, .task-end-time, .task-category {
  margin: 5px 0;
}

.claim-button {
  margin-top: 10px;
}
</style>
