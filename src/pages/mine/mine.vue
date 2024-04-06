<template>
  <view>
    </view>
    <view class="the-information-buttons">
      <view class="half-up">
        <text>用户名：{{userName}}</text>
        <text>\n用户ID：{{userId}}</text>
      </view>

      <view class="down-page">
        <view class="personal-information">个人信息</view>
        <view class="goodgood-bank">美德银行</view>
        <view class="release-task">发布任务</view>
        <view class="record">积分记录</view>
        <view class="online-service">在线客服</view>
        <view class="feedback-consultation">咨询和反馈</view>
        <view class="setting">设置</view>
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
.half-up {
  border: 2px solid black;
  border-radius: 40rpx; /* 设置圆角使其呈现为椭圆形 */
  margin-top: 45px;/* 设置距离页面顶部距离 */
  height: 80px;
}
.personal-information {
  height: 35px;
}
.goodgood-bank {
  height: 35px;
}
.release-task {
  height: 35px;
}
.record {
  height: 35px;
}
.online-service {
  height: 35px;
 }
.feedback-consultation {
  height: 35px;
}
.setting {
  height: 35px;
}
.the-information-buttons {
  width: 80%; /* 设置视图的宽度为屏幕宽度的80% */
  margin-left: 10%; /* 设置左边距为屏幕宽度的10% */
  margin-right: 10%; /* 设置右边距为屏幕宽度的10% */
  margin-bottom: 20px; /* 设置视图之间的间距 */
}
.down-page{
  text-align: center;
}
</style>
