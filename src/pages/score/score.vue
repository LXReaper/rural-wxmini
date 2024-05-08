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
</template>

<script>
export default {
  data() {
    return {};
  }
}
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
</style>
