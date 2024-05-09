<template>

      <view class="contact-background">
        <uni-icons class="uniui-person" type="contact" size="17" color="green">个人中心</uni-icons>
      </view>

    <view class="the-information-buttons">

      <view class="half-up">
        <image class="head" src="/static/logo.png"></image>
        <view class="the-text">
          <text>用户名：102yes{{userName}}</text>
          <text>\n用户ID：114514{{userId}}</text>
          <text>\n我的积分：114514{{userIndex}}</text>
        </view>

      </view>

      <view class="two-choice">
        <view class="index-record">积分记录</view>
        <view class="information">我的信息</view>
      </view>
      <view class="down-page">
        <view class="goodgood-bank">
          <image class="icon" src="./static/mine/record.png"></image> <!-- 图标放在文本左边 -->
          美德银行
        </view>
        <view class="release-task">发布任务</view>
        <view class="record">积分记录</view>
        <view class="online-service">在线客服</view>
        <view class="feedback-consultation">咨询和反馈</view>
        <view class="setting">设置</view>
      </view>
    </view>

</template>

<script>
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";

export default {
  components: {UniIcons},
  data() {
    return {};
  }
}
</script>

<style lang="scss">
.uniui-person{
  color: green;
}
.contact-background{
  margin-top: 10rpx;
  margin-left: 10rpx;
  border: 2rpx solid grey;
  border-radius: 20rpx;
  background-color: white;
  width: 200rpx;
  height: 50rpx
}
.icon {
  width: 50rpx; /* 设置图标宽度 */
  height: 50rpx; /* 设置图标高度 */
  margin-top: 10rpx; /* 调整图标与上方元素的间距 */
}
.head{
  border: white;
  border-radius: 160rpx;
  width:  150rpx;
  height: 150rpx;
  margin-left: 4rpx;
  margin-top: 4rpx;
}
.index-record {
  margin-top: 20rpx;
  height: 75rpx;
  border-right: 4rpx solid #EFF3FF;
  width: 300rpx;
}
.information{
  margin-top: 25rpx;
  height: 75rpx;
  width: 300rpx;
  border-radius: 20rpx;
}

.goodgood-bank {
  height: 85rpx;
  line-height: 85rpx;
}
.release-task {
  height: 85rpx;
  line-height: 85rpx;
  border-top: 4rpx solid #EFF3FF;
}
.record {
  height: 85rpx;
  line-height: 85rpx;
  border-top: 4rpx solid #EFF3FF;
}
.online-service {
  height: 85rpx;
  line-height: 85rpx;
  border-top: 4rpx solid #EFF3FF;
 }
.feedback-consultation {
  height: 85rpx;
  line-height: 85rpx;
  border-top: 4rpx solid #EFF3FF;
}
.setting {
  height: 85rpx;
  line-height: 85rpx;
  border-top: 4rpx solid #EFF3FF;
}
.the-information-buttons {
  margin-left: 10%; /* 设置左边距为屏幕宽度的10% */
  margin-right: 10%; /* 设置右边距为屏幕宽度的10% */
  margin-bottom: 40rpx; /* 设置视图之间的间距 */
}
.half-up {
  border-radius: 50rpx; /* 设置圆角使其呈现为椭圆形 */
  margin-top: 20rpx;/* 设置距离页面顶部距离 */
  height: 220rpx;
  display: flex;
  background-color: white;
  border: 2rpx solid grey;
}
.the-text{
  margin-top: 40rpx;
  margin-left: 20rpx;
  font-size: 35rpx;
}
.two-choice{
  margin-top: 20rpx;
  text-align: center;
  display: flex;
  line-height: 75rpx;
  background-color: white;
  border-radius: 20rpx;
  height: 125rpx
}
.down-page{
  margin-top: 20rpx;
  text-align: center;
  background-color: white;
}
.icon {
  margin-right: 10rpx; /* 调整图标与文本之间的间距 */
}
</style>
