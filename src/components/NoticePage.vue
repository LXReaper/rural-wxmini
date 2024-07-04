<template>
  <view class="notification">
    <view class="title">{{ title }}</view>
    <view class="content">{{ content }}</view>
    <view class="meta">
      <view class="sender">{{ sender }}</view>
      <view class="time">{{ time }}</view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.notification {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 15px 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.content {
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #888;
}

.sender {
  font-weight: 500;
}

.time {
  font-weight: 400;
}
</style>
