<template>

  <view class="index-store">

    <view class="store-top">
      <view class="a0"><text>积分商城</text></view>
      <view class="a1"><text>全部商品 >></text></view>
    </view>

    <view class="firstline">
        <view class="goods">
          <text>\n商品名称：</text>
          <text>\n价格：</text>
          <text>\n剩余个数：</text>
        </view>
        <view class="goods">
          <text>\n商品名称：</text>
          <text>\n价格：</text>
          <text>\n剩余个数：</text>
        </view>
    </view>

  </view>
  <button class="custom-button" @click="onClick">点击按钮</button>
</template>

<script setup>
const onClick = () => {
  uni.navigateTo({
    url: "/pages/score/scoreHomePage",
  });
};



</script>

<style lang="scss">
.index-store{
  border-radius: 50rpx;
  background-color: white;
  margin-left: 30rpx;
  margin-right: 30rpx;

  height: 1000rpx;
}
.store-top{
  display: flex;
}
.a0{
  margin-left: 20rpx;   margin-top: 10rpx;
  font-size: 40rpx;
}
.a1{
  margin-top: 10rpx;  margin-right: 20rpx;    margin-left: 270rpx;
  border: 3rpx black;
  border-radius: 50rpx;
  background-color: grey;
  text-align: center;
  font-size: 30rpx;
  height: 50rpx;  width: 200rpx;
}
.firstline{
  display: flex;
}
.goods{
  margin-left: 15rpx;
  width: 300rpx;
  background-color: grey;
  border-radius: 10rpx;
  font-size: 32rpx;
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
</style>
