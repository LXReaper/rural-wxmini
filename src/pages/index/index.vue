<template>
  <!-- 页面全局配置 -->
  <view>
    <scroll-view>
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入搜索内容" clear-button="auto" cancel-button="none"
                      @confirm="search"/>

      <swiper class="swiper-style" indicator-dots="true" autoplay="true" interval="10000" duration="200"
              circular="true">
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/大米.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/盐.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/金龙鱼油.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/饲料.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
      </swiper>

      <div style="display: flex;margin-left: 7vw;margin-top: 3vh;gap: 8vw">
        <view class="circle"
              style="border-radius: 50%;width: 15vw;height: 10vh;background: linear-gradient(to bottom, #8bd3fb, #4e98f8);padding-top: 2.3vh;">
          <view style="margin-left: 4vw">
            <uni-icons type="staff" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 3.7vh">社区活动</view>
        </view>
        <view
            style="border-radius: 50%;width: 15vw;height: 10vh;background: linear-gradient(to bottom, #9fe148, #78ca48);padding-top: 2.3vh">
          <view style="margin-left: 4vw">
            <uni-icons type="vip" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 3.7vh">美德银行</view>
        </view>
        <view
            style="border-radius: 50%;width: 15vw;height: 10vh;background: linear-gradient(to bottom, #f8de81, #f3b246);padding-top: 2.3vh">
          <view style="margin-left: 4vw">
            <uni-icons type="chat" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 3.7vh">公告咨询</view>
        </view>
        <view
            style="border-radius: 50%;width: 15vw;height: 10vh;background: linear-gradient(to bottom, #f3acd1, #ee7a7e);padding-top: 2vh">
          <view style="margin-left: 4vw">
            <uni-icons type="hand-up" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 4vh">文明家庭</view>
        </view>
      </div>

      <!--      优秀村民-->

      <!--任务 -->
      <view style="margin-top: 8vh">
        <!--        标题栏-->
        <view>
          <text style="font-weight: bolder;font-size: 5vw">任务列表</text>
          <text style="margin-left: 65vw;color: rgb(155, 155, 155);">更多</text>
        </view>
        <view class="card-container">
          <view class="card-column">
            <uni-card class="card">
              <view class="card-content">
                <text class="bold-text">活动名称：健康跑</text>
                <text class="bold-text">公告详情：加入我们的社区健康跑活动，享受运动的乐趣！</text>
                <text class="bold-text">时间：2023年4月15日 09:00</text>
              </view>
            </uni-card>
            <uni-card class="card">
              <view class="card-content">
                <text class="bold-text">活动名称：环保讲座</text>
                <text class="bold-text">公告详情：了解如何保护我们的环境，参与环保讲座。</text>
                <text class="bold-text">时间：2023年4月20日 14:00</text>
              </view>
            </uni-card>
          </view>
          <view class="card-column">
            <uni-card class="card">
              <view class="card-content">
                <text class="bold-text">活动名称：社区清洁日</text>
                <text class="bold-text">公告详情：一起参与社区清洁日，让我们的家园更美好。</text>
                <text class="bold-text">时间：2023年4月25日 08:00</text>
              </view>
            </uni-card>
            <uni-card class="card">
              <view class="card-content">
                <text class="bold-text">活动名称：文化节</text>
                <text class="bold-text">公告详情：体验多元文化，参与我们的社区文化节。</text>
                <text class="bold-text">时间：2023年5月1日 10:00</text>
              </view>
            </uni-card>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import UniCard from "../../uni_modules/uni-card/components/uni-card/uni-card.vue";
</script>
<style lang="scss">
.swiper-style {
  height: 300rpx;

  .item {
    padding: 0 30rpx;
    box-sizing: border-box;

    image {
      border-radius: 50rpx;
      width: 100%;
      height: 300rpx;
    }
  }
}

.card-container {
  display: flex;
  justify-content: space-between;

  .card-column {
    width: calc(50% - 5rpx); // 调整宽度以减少间隔
    .card {
      height: 220rpx; // 调整高度以匹配宽度
      width: calc(100% - 10rpx); // 调整宽度以增加卡片大小
      margin-bottom: 20rpx;

      .card-content {
        display: flex;
        flex-direction: column;

        .bold-text {
          font-size: 26rpx; // 保持字体大小和加粗
          font-weight: bold;
          margin-bottom: 10rpx;
        }
      }
    }
  }
}
</style>
