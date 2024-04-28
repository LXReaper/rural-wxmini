<template>
  <!-- 页面全局配置 -->
  <view>
    <scroll-view>
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入搜索内容" clear-button="auto" cancel-button="none" @confirm="search"/>

      <swiper class="swiper-style" indicator-dots="ture" autoplay="ture" interval="10000" duration="200" circular="ture">
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/大米.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/盐.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/金龙鱼油.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/饲料.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
      </swiper>

      <view style="display: flex" id="button">
        <button class="button1">
          <view><uni-icons type="staff" size="20" style="margin-top: -20%"></uni-icons></view>
          <view style="margin-top: -33%;font-size: 30rpx">社区活动</view>
        </button>
        <button class="button2">
          <view><uni-icons type="vip" size="20" style="margin-top: -20%"></uni-icons></view>
          <view style="margin-top: -33%;font-size: 30rpx">美德银行</view>
        </button>
        <button class="button3">
          <view><uni-icons type="chat" size="20" style="margin-top: -20%"></uni-icons></view>
          <view style="margin-top: -33%;font-size: 30rpx">公告咨询</view>
        </button>
        <button class="button4">
          <view><uni-icons type="hand-up" size="20" style="margin-top: -20%"></uni-icons></view>
          <view style="margin-top: -33%;font-size: 30rpx">文明家庭</view>
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  date(){

  },
  methods: {
    search(res){

    }
  },
}

</script>

<style lang="scss">
/**本页全局配置的代码**/
//轮播图
.swiper-style{
  height: 300rpx;
  .item{
    padding: 0 30rpx;
    box-sizing: border-box;
    image{
      border-radius: 50rpx;
      width: 100%;
      height: 300rpx;
    }
  }
}
#button{
  height: 150rpx;
  //点击前效果
  .button1{
    border-radius: 20rpx;
    background-color:#ffd700;
    align-content: center;
    width: 180rpx;
  }
  .button2{
    border-radius: 20rpx;
    background-color: #67C23A;
    align-content: center;
    width: 180rpx;
  }
  .button3{
    border-radius: 20rpx;
    background-color: #cfff00;
    align-content: center;
    width: 180rpx;
  }
  .button4{
    border-radius: 20rpx;
    background-color: #008000;
    align-content: center;
    width: 180rpx;
  }
  //点击后效果
  .button1:active{
    display: flex;
    flex-direction: column;

  }
  .button2:active{
    display: flex;
    flex-direction: column;

  }
  .button3:active{
    display: flex;
    flex-direction: column;

  }
  .button4:active{
    display: flex;
    flex-direction: column;

  }
}
</style>
