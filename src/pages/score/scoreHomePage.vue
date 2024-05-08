<template>
  <view>
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
  </view>
</template>

<script setup lang="ts">

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
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button:nth-child(1) {
  background-color: #ff0000;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}
.button:nth-child(2) {
  background-color:  #00ff00;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}
.button:nth-child(3) {
  background-color:  #0000ff;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}
.button:nth-child(4) {
  background-color:  #ffff00;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}
.button:nth-child(5) {
  background-color: #ff00ff;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}
.button:nth-child(6) {
  background-color: #00ffff;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}
</style>
