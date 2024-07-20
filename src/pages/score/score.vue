<template>
  <scroll-view
        scroll-y="true"
        bindscroll="handleScroll"
        scroll-with-animation="true"
  ><!--可滑动页面-->
    <!-- 圆角矩形容器 -->
    <view class="rounded-container">
      <!-- 六个小按钮 -->
      <view class="category-bar">
        <view v-for="(category ,index) in categories" :key="index" @click="selectCategory(category)"
              :class="{active: category === selectedCategory}">
          {{ category }}
        </view>
      </view>
    </view>

      <view
          class="custom-button"
          @click="onClick"
      >
        <view style="display: flex">
          <view
              style="
              width: 13vw;
              height: 8vh;
              margin-top: -2vh;
              border-radius: 7vw;
              box-shadow: 0 -6px 10px rgba(0, 0, 0, 0.2);
              background-image: url('https://2021539.s81i.faiusr.com/4/101/AFEIo7F7EAQYACDUksOBBijYz4fMBzA-ODpAZQ.png')
              "
          >
          </view>
          <view style="margin-left: 4vw">
            <view style="font-size: 4.7vw;">积分商城</view>
            <view style="font-size: 3vw">Shop</view>
          </view>
        </view>
      </view>
      <!--下方四个按钮-->
      <view style="background-color: white;margin: 1vw 0;height: 32vh;padding-top: 1vh">
        <view style="display: flex;gap: 5vw;margin-left: 8vw;margin-top: 2vh;">
          <view class="the-card" style="background: linear-gradient(to bottom, #FFDAB9, #FFC0CB);"
                @click="LearningCenter">
            <view class="title-wrap">
              <view class="main-title">学习中心</view>
              <view style="font-size: 12px; color: rgb(153, 153, 153);">学习技能</view>
            </view>
            <view class="material-icon"
                  style="background-image: url('https://17829202.s61i.faimallusr.com/4/AD0I0prACBAEGAAg6sSr3gUo5vCLlwEwUjhS.png');">
              <view class="circle"/>
            </view>
          </view>
          <view class="the-card" style="background: linear-gradient(to bottom, #FFE4B5, #FFd500);"
                @click="onMissionCenter">
            <view class="title-wrap">
              <view class="main-title">任务中心</view>
              <view style="font-size: 12px; color: rgb(153, 153, 153);">全部任务</view>
            </view>
            <view class="material-icon"
                  style="background-image: url('https://17829202.s61i.faimallusr.com/4/AD0I0prACBAEGAAgy8Sr3gUomKnhqgcwUjhS.png')">
              <view class="circle"/>
            </view>
          </view>
        </view>
        <view style="display: flex;gap: 5vw;margin-left: 8vw;margin-top: 2vh;">
          <view class="the-card" style="background: linear-gradient(to bottom, #9fe148, #78aa48);"
                @click="navigateToCharts">
            <view class="title-wrap">
              <view class="main-title">排行榜&ensp;&ensp;</view>
              <view style="font-size: 12px; color: rgb(153, 153, 153);">积分排行</view>
            </view>
            <view class="material-icon"
                  style="background-image: url('https://17829202.s61i.faimallusr.com/4/AD0I0prACBAEGAAgh8Wr3gUo8_ODywIwUjhS.png');">
              <view class="circle"/>
            </view>
          </view>
          <view class="the-card" style="background: linear-gradient(to bottom, #00FF7F, #40E0D0);">
            <view class="title-wrap">
              <view class="main-title">文明家庭</view>
              <view style="font-size: 12px; color: rgb(153, 153, 153);">优秀家庭</view>
            </view>
            <view class="material-icon"
                  style="background-image: url('https://1102408.s81i.faiusr.com/4/101/AFEIyKRDEAQYACDhsKbwBSj1gIhaMFo4WkBl.png')">
              <view class="circle"/>
            </view>
          </view>
        </view>
      </view>

    <view class="recommend-text">{{ recommendMessage }}</view>
    <!--    热门商品推荐-->
    <view class="recommend-section">
      <text class="recommend-title">热门商品推荐</text>
      <!-- 商品卡片 -->
      <!--      点击卡片就进入积分商城页面-->
      <hot-goods-view />
      <!-- 添加更多商品卡片 -->
    </view>
  </scroll-view>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {loginIntercept} from "../../utils/loginInterceptUtils";
import {onShow} from "@dcloudio/uni-app";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import HotGoodsView from "../../components/shop/hotGoodsView.vue";

const categories = ref(['总览', '卫生', '贡献', '任务', '签到', '考察']);
//存储选定的状态
const selectedCategory = ref('总览');
const selectCategory = (category) => {
  selectedCategory.value = category;
};
// 点击商品卡片跳转到积分商城页面
const onClick = () => {
  uni.navigateTo({
    url: "/pages/score/scoreHomePage",
  });
};
const LearningCenter = () => {
  uni.navigateTo({
    url: "/pages/score/LearningCenter"
  });
};
const onMissionCenter = () => {
  uni.navigateTo({
    url: "/pages/score/MissionCenter"
  })

}
const recommendMessage = '以下是推荐商品';

const navigateToCharts = () => {
  uni.navigateTo(
      {
        url: "/pages/score/Charts"
      }
  )
}
const currentPage = getCurrentPages()[getCurrentPages().length - 1];
const currentRoute = currentPage.route;
onShow(() => {
  loginIntercept("/" + currentRoute);
})
</script>

<style scoped lang="scss">
/*上方按钮的样式*/
.category-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f8f8f8;
}

.category-bar > view {
  cursor: pointer;
  padding: 10px;
}

.rounded-container {
  border-radius: 10px;
  padding: 10px;
  background-color: #f8f8f8;
}

.category-button {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.category-button:hover {
  background-color: #e0e0e0;
}

.category-button.active {
  font-weight: bold;
  color: #007BFF; /* 选中状态颜色 */
  background-color: #e0e0e0;
}

/*四个卡片*/
.the-card {
  display: flex;
  width: 40vw;
  border: 1px solid #e2e2e2;
  box-shadow: 10px 7px 6px rgba(0, 0, 0, 0.1);
}

.title-wrap {
  height: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 10px;
}

.main-title {
  font-size: 4vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  color: rgb(53, 53, 53);
}

.material-icon {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: top;
  margin-left: 11vw;
  padding-top: 3vh;
  color: #fff;
  text-align: left;
}

.circle {
  width: 10vw;
  height: 6vh;
  border-radius: 50%;
  padding-left: 1vw;
  padding-top: 0.333vh;
}

/*按钮*/
.button {
  width: auto; /* 自适应宽度 */
  height: 30px;
  margin-right: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
}


#button2 {
  display: flex;
}

.button1,
.button2,
.button3,
.button4 {
  flex: 1;
  height: 30px;
  margin-right: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #04cefc; /* 默认背景颜色 */
  color: white; /* 文本颜色 */
  font-size: 0.8em; /* 使用相对单位设置文本大小 */
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出部分文本 */
  text-overflow: ellipsis; /* 显示省略号 */
}

.button2 {
  background-color: #4cd964;
}

.button3 {
  background-color: #007aff;
}

.button4 {
  background-color: #04fefc;
}

/*积分商城*/
.custom-button {
  margin-top: 20px; /* 调整按钮与上方元素的间距 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 移除按钮边框 */
  padding-left: 27vw;
  padding-top: 0.9vh;
  background-color: #4cd964;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  width: 90vw;
  height: 9vh;
  margin-left: 5vw;
  margin-right: 5vw;
  position: relative;
}

.recommend-text {
  text-align: center;
  font-size: 18px;
  margin-top: 20px; /* 根据需要调整上边距 */
}

.recommend-section {
  padding: 20px;
  background-color: #f9f9f9;
}

/* 热门商品推荐标题 */
.recommend-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 2vh;
}

</style>

}
