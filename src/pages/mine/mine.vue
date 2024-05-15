<template>

  <view class="contact-background">
    <uni-icons class="uniui-person" type="contact" size="15" color="green"
               @click="personal">个人中心
    </uni-icons>
  </view>

  <view class="the-information-buttons">

    <view class="half-up">
      <image class="head" :src="userAvatar" @click="updateAvatar"/>
      <view class="the-text">
        <text>用户名：{{ userName }}</text>
        <view>
          <text>用户ID:</text>
          <text class="userId">{{ userId }}</text>
        </view>
        <text>我的积分：114514{{ userIndex }}</text>
      </view>

    </view>

    <view class="two-choice">
      <button class="index-record">积分记录</button>
      <button class="information">我的信息</button>
    </view>

    <view class="down-page">
      <button class="goodgood-bank">美德银行</button>
      <button class="release-task">发布任务</button>
      <button class="record">积分记录</button>
      <button class="online-service">在线客服</button>
      <button class="feedback-consultation">咨询和反馈</button>

      <button class="setting" @click="settingClick">设置</button>
    </view>
  </view>

</template>

<script setup>
import {ref} from "vue"
import {useStore} from "vuex";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {makeRequest} from "../../utils/request/requestUtil";

const store = useStore();
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const url = `${backendBaseInfo}/api/user/unBind/miniOpenId`;//解除绑定请求后端url
const userAvatar = ref(store.state.user.loginUser.avatar || "https://tse1-mm.cn.bing.net/th/id/OIP-C.Wt7U7ijKxRCz4NIIpHzBRAHaHm?rs=1&pid=ImgDetMain");
const userName = ref(store.state.user.loginUser.villager_name);
const userId = ref(store.state.user.loginUser.villager_id);
const settingClick = () => {
  uni.navigateTo({
    url: "/pages/mine/setting",
  });
};
const personal = () => {
  uni.navigateTo({
    url: "/pages/mine/personal-information",
  });
};

//修改头像
const updateAvatar = () => {
  console.log()
}

//微信解除绑定
const unBindWechat = () => {
  const id = store.state.user.loginUser.villager_id;
  makeRequest(url, "Get", {
    userId: id,
  }).then((res) => {
    if (res.data.code === 0) {
      uni.showToast({
        title: "成功解除绑定",
        icon: "success"
      })
    } else {
      uni.showToast({
        title: res.data.message,
        icon: "error",
      })
    }
  }).catch((error) => {
    console.log("请求失败，" + error);
  });
}
</script>

<style lang="scss">
.uniui-person {
  color: green;
  margin-top: 2rpx;
}

.contact-background {
  margin-top: 10rpx;
  margin-left: 10rpx;
  border: 2rpx solid grey;
  border-radius: 20rpx;
  background-color: white;
  width: 190rpx;
  height: 50rpx;
}

.head {
  border: white;
  border-radius: 50%;
  width: 150rpx;
  height: 150rpx;
  margin: auto 0 auto 12rpx;
}

.userId {
  font-size: 3vw; //这里相对窗口的大小
  font-weight: bold;
}

.index-record {
  width: 300rpx;
  border-radius: 20rpx;

}

.information {
  width: 300rpx;
  border-radius: 20rpx;

}

.goodgood-bank {
  height: 85rpx;
  font-size: 39rpx;
  line-height: 80rpx;
}

.release-task {
  height: 85rpx;
  font-size: 39rpx;
  line-height: 80rpx;
}

.record {
  height: 85rpx;
  font-size: 39rpx;
  line-height: 80rpx;
}

.online-service {
  height: 85rpx;
  font-size: 39rpx;
  line-height: 80rpx;

}

.feedback-consultation {
  height: 85rpx;
  font-size: 39rpx;
  line-height: 80rpx;
}

.setting {
  height: 85rpx;
  font-size: 39rpx;
  line-height: 80rpx;

}

.the-information-buttons {
  margin-left: 10%; /* 设置左边距为屏幕宽度的10% */
  margin-right: 10%; /* 设置右边距为屏幕宽度的10% */
  margin-bottom: 40rpx; /* 设置视图之间的间距 */
}

.half-up {
  border-radius: 50rpx; /* 设置圆角使其呈现为椭圆形 */
  margin-top: 20rpx; /* 设置距离页面顶部距离 */
  height: 220rpx;
  display: flex;
  background-color: white;
  border: 2rpx solid grey;
}

.the-text {
  margin: auto 0 auto 20rpx;
  font-size: 4vw; //这里相对窗口的大小
}

.two-choice {
  margin-top: 20rpx;
  text-align: center;
  display: flex;
  line-height: 75rpx;
  background-color: #EFF3FF;
  border-radius: 20rpx;
  height: 125rpx
}

.down-page {
  margin-top: 20rpx;
  text-align: center;
  background-color: #EFF3FF;
}

</style>
