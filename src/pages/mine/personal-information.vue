<template>

  <view class="user">

    <view class="yourhead">
      <image class="head" @click="open" src="./static/store/lqj.jpg">
      </image>

      <uni-popup ref="a00" type="bottom">
        <view class="popup">
          <button class="choose">选择图片</button>
          <button class="hide" @click="close">取消</button>
        </view>
      </uni-popup>

    </view>

    <view class="yourname">
      用户名在此处
    </view>

    <view class="yourID">
      用户ID在此处不可更改
    </view>

  </view>

</template>

<script setup>
const data = {};
const methods = {
  open() {
    this.$refs.a00.open('bottom');
  },
  close() {
    this.$refs.a00.close();
  }
};
</script>

<style scoped lang="scss">
.user{

  background-color: white;
}
.head{
  border: white;
  border-radius: 180rpx;
  width:  325rpx;
  height: 325rpx;

}
.yourhead{
  justify-content: center;
  align-items: center;
}
</style>
