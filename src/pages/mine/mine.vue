<template>
  <view>
    <view class="uni-title uni-common-mt">
      <text>\n</text>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <view class="half-up">
        <text>\n用户名：{{userName}}</text>
        <text>\n用户ID：{{userId}}</text>
      </view>
      <view class="about-user">
        <view class="persona">A</view>
      </view>
      <view class="uni-title uni-common-mt">
        <text>\n</text>
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
}
.personal-information {
  border: 2px solid black;
}
.goodgood-bank {
  border: 2px solid black;
}
.release-task {
  border: 2px solid black;
}
.record {
  border: 2px solid black;
}
.online-service {
   border: 2px solid black;
 }
.feedback-consultation {
  border: 2px solid black;
}
.setting {
  border: 2px solid black;
}
</style>
