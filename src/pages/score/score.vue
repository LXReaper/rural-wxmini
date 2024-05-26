<template>
  <scroll-view scroll-y="true" bindscroll="handleScroll" scroll-with-animation="true"><!--可滑动页面-->
    <!-- 圆角矩形容器 -->
    <view class="rounded-container">
      <!-- 六个小按钮 -->
      <view class="button" style="background-color: #ff0000;">总览</view>
      <view class="button" style="background-color: #00ff00;">卫生</view>
      <view class="button" style="background-color: #0000ff;">贡献</view>
      <view class="button" style="background-color: #ffff00;">任务</view>
      <view class="button" style="background-color: #ff00ff;">签到</view>
      <view class="button" style="background-color: #00ffff;">考察</view>
    </view>
    <!--下方四个按钮-->
    <view style="display:flex" id="button2">
      <button class="button1" style="background-color: #04cefc" @click="LearningCenter">学习中心</button>
      <button class="button2" style="background-color: #4cd964" @click="onMissionCenter">任务中心</button>
      <button class="button3" style="background-color: #007aff">排行榜</button>
      <button class="button4" style="background-color: #04fefc">文明家庭</button>
    </view>
    <button class="custom-button" @click="onClick">积分商城</button>
    <view class="recommend-text">{{ recommendMessage }}</view>
<!--    热门商品推荐-->
    <view class="recommend-section">
      <text class="recommend-title">热门商品推荐</text>
      <!-- 商品卡片 -->
<!--      点击卡片就进入积分商城页面-->
      <view class="product-card" @click="navigateToScorePage">
        <image class="product-image" src="/static/images/notices/advertisements/金龙鱼油.jpg"></image>
        <text class="product-title">商品标题</text>
        <text class="product-description">商品描述</text>
        <text class="product-price">￥99.99</text>
      </view>
      <!-- 添加更多商品卡片 -->
    </view>
  </scroll-view>
</template>

<script setup >
// 点击商品卡片跳转到积分商城页面
const onClick = () => {
  uni.navigateTo({
    url: "/pages/score/scoreHomePage",
  });
};
const  LearningCenter = () =>{
  uni.navigateTo({
    url:"/pages/score/LearningCenter"
  });
};
const onMissionCenter=()=>{
  uni.navigateTo({
    url:"/pages/score/MissionCenter"
  })

}
const recommendMessage = '以下是推荐商品';
// 跳转到积分商城页面
const navigateToScorePage =()=>{
  uni.navigateTo(
      {
        url:"/pages/score/scoreHomePage"
      }
  )
}
</script>

<style scoped lang="scss">
.rounded-container {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  display: flex; /* 使用 Flex 布局 */
}

.button {
  width: auto; /* 自适应宽度 */
  height: 30px;
  margin-right: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}


#button2 {
  display: flex;
}
.button1,
.button2,
.button3,
.button4 {
  flex: 1;
  height: 30px;
  margin-right: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04cefc; /* 默认背景颜色 */
  color: white; /* 文本颜色 */
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出部分文本 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.button2 {
  background-color: #4cd964;
}

.button3 {
  background-color: #007aff;
}

.button4 {
  background-color: #04fefc;
}
.custom-button {
  margin-top: 20px; /* 调整按钮与上方元素的间距 */
  background-color: blue; /* 按钮背景颜色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 移除按钮边框 */
  border-radius: 5px; /* 设置按钮圆角 */
  padding: 10px 20px; /* 设置按钮内边距 */
  font-size: 20px; /* 设置按钮文字大小 */
}
.recommend-text {
  text-align: center;
  font-size: 18px;
  margin-top: 20px; /* 根据需要调整上边距 */
}
.recommend-section {
  padding: 20px;
  background-color: #f9f9f9;
}

/* 热门商品推荐标题 */
.recommend-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 商品卡片 */
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.product-price {
  font-size: 16px;
  color: #f00;
}
</style>

}
