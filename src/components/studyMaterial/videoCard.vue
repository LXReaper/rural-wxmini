<template>
  <view class="video-card">
    <!-- 封面图片框 -->
    <view class="thumbnail-frame">
      <image class="thumbnail" :src="thumbnail" mode="aspectFill"></image>
    </view>
    <!-- 视频卡片内容 -->
    <view class="content">
      <view class="title-row">
        <text class="title">{{ title }}</text>
      </view>
      <!-- 日期行 -->
      <view class="date-row">
        <text class="date">{{ date }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  date: { // 添加日期属性
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.video-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  .thumbnail-frame {
    width: 100%;
    // 使用 padding-top 来保持16:9的比例
    padding-top: 56.25%;
    position: relative; // 将 position 设置为 relative 让内部元素可以绝对定位

    .thumbnail {
      position: absolute; // 绝对定位
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; // 高度会基于父容器的 padding-top 来设置
      object-fit: cover;
    }
  }

  .content {
    width: 100%;
    margin-top: 10px;

    .title-row, .date-row { // 确保日期行样式
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .title {
        font-size: calc(0.8vw + 0.7em);
        font-weight: bold;
        word-wrap: break-word;
      }

      .date {
        margin-top: 10px; // 日期与标题间距
        font-size: calc(0.8vw + 0.6em);
        color: #999; // 日期文本颜色
      }
    }
  }
}
</style>
