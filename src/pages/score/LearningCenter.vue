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
          :date="video.date"
      />
    </view>
  </view>
</template>

<script setup>
import UniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar'
import VideoCard from '../../components/studyMaterial/VideoCard.vue'
import { ref } from 'vue'

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
</style>
