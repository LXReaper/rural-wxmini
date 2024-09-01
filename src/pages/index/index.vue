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
              style="background: linear-gradient(to bottom, #8bd3fb, #4e98f8)">
          <view style="margin-left: 4vw">
            <uni-icons type="staff" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 3.7vh">社区活动</view>
        </view>
        <view class="circle"
              style="background: linear-gradient(to bottom, #9fe148, #78ca48)">
          <view style="margin-left: 3.9vw">
            <uni-icons type="vip" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 3.7vh">美德银行</view>
        </view>
        <view class="circle"
              style="background: linear-gradient(to bottom, #f8de81, #f3b246)">
          <view style="margin-left: 3.9vw">
            <uni-icons type="chat" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 3.7vh">公告咨询</view>
        </view>
        <view class="circle"
              style="background: linear-gradient(to bottom, #f3acd1, #ee7a7e)">
          <view style="margin-left: 4vw">
            <uni-icons type="hand-up" size="35"/>
          </view>
          <view style="font-size: 3vw;margin-left: 1vw;margin-top: 3.7vh">文明家庭</view>
        </view>
      </div>

      <!--      优秀村民-->

      <!--任务 -->
      <view style="margin-top: 8vh">
        <!--        标题栏-->
        <uni-segmented-control :current="current" :values="items" :style-type="'text'"
                               :active-color="'#ee7a7e'" @clickItem="(e) => current = current !== e.currentIndex ? e.currentIndex : current" />
        <index-task-view v-if="current === 0"/>
      </view>
    </scroll-view>
    <view style="height: 5vh;margin-top: 2vh;text-align: center;color: #999999">
      积分治理小程序
    </view>
  </view>
</template>

<script setup>
import {ref} from "vue";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import UniCard from "../../uni_modules/uni-card/components/uni-card/uni-card.vue";
import IndexTaskView from "../../components/task/IndexTaskView.vue";
import HomeAnnouncement from "../../components/announcements/HomeAnnouncement.vue";
import UniEditor from "../../components/Editor/uniEditor.vue";

//标题栏的所有标题名称
const items = ref(["任务信息","活动信息","文明家庭"]);
const current = ref(0);//当前标题

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

/*圆圈*/
.circle {
  border-radius: 50%;
  width: 15vw;
  height: 10vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding-top: 2.3vh;
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
