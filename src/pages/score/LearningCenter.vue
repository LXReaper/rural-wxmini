<template>
  <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入课程名称或课程编号" clearButton="auto" cancelButton="none" @confirm="search"/>
  <swiper class="swiper-style" indicator-dots="ture" autoplay="ture" interval="10000" duration="200" circular="ture">
    <swiper-item class="item">
      <image src="/static/images/notices/advertisements/大米.jpg" class="image-swiper-style" mode="aspectFill"></image>
    </swiper-item>
    <swiper-item class="item">
      <image src="/static/images/notices/advertisements/盐.jpg" class="image-swiper-style" mode="aspectFill"></image>
    </swiper-item>
    <swiper-item class="item">
      <image src="/static/images/notices/advertisements/金龙鱼油.jpg" class="image-swiper-style" mode="aspectFill"></image>
    </swiper-item>
    <swiper-item class="item">
      <image src="/static/images/notices/advertisements/饲料.jpg" class="image-swiper-style" mode="aspectFill"></image>
    </swiper-item>
  </swiper>

  <view class="container">
    <view class="button-container">
      <button class="btn" @click="currentTab = 'video'">视频学习</button>
      <view class="separator"></view>
      <button class="btn" @click="currentTab = 'article'">推文学习</button>
    </view>
  </view>
  <view class="content-container">
    <view v-if="currentTab === 'video'">
      <text>这里是视频学习的内容</text>
      <!-- 视频卡片容器 -->
      <view class="video-container">
        <view class="video-row"
              v-for="(video, index) in videos"
              :key="video.id"
              :class="{ 'right-margin': index % 2 === 0 }">
          <video-card
              :id="video.id"
              :title="video.title"
              :description="video.description"
              :thumbnail="video.thumbnail"
              :date="video.date"/>
        </view>
      </view>
    </view>
    <view v-if="currentTab === 'article'">
      <text>这里是推文学习的内容</text>
      <text>推文1</text>
    </view>
  </view>

</template>

<script setup>
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar'
import VideoCard from '../../components/studyMaterial/VideoCard.vue'
import { ref } from 'vue'
const currentTab = ref('video')//默认显示视频内容
// 示例视频数据
const videos = ref([
  // 填充您的视频对象数组
  { id: '1', title: '视频标题1', description: '描述1', thumbnail: '/static/images/notices/advertisements/大米.jpg', date: '2023-01-01' }, // 添加日期属性
  { id: '2', title: '视频标题2', description: '描述2', thumbnail: '/static/images/notices/advertisements/金龙鱼油.jpg', date: '2023-01-02' }, // 添加日期属性
  // ...
])

const search = (res) => {
  uni.showToast({
    title: '搜索：' + res.value,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.video-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.video-row {
  width: calc(50% - 5px);
  box-sizing: border-box;
  padding: 2px;

  // 为每个奇数卡片（索引为 0, 2, 4...）添加右边距
  &.right-margin {
    margin-right: 10px;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
}

.button-container {
  display: flex;
  flex-direction: row;
  width: 100%;  // 宽度设置为100%确保按钮平分容器空间
  margin-bottom: 20rpx;
}

.btn {
  flex: 1;  // 确保按钮平分容器空间
  padding: 20rpx;
  text-align: center;
  background-color: #409EFF;
  color: white;
  border: none;
  border-radius: 5rpx;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #66b1ff;
}

.separator {
  width: 2rpx;
  height: 40rpx;
  background-color: #ccc;
  margin: 0 10rpx;
}

.content-container {
  width: 100%;
  margin-top: 20rpx;
  text-align: center;
}
</style>
