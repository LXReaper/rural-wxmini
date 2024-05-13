<template>

  <view class="all-settings">
    <button class="b00" @click="bindWechat">
      账号与安全
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b01">
      通用
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b02">
      关于小程序
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b03">
      权限
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b04">
      帮助与反馈
      <uni-icons type="right" size="20"></uni-icons>
    </button>

  </view>

  <view class="number">版本号：{{ number }}</view>


</template>

<script setup>
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {ref} from "vue";
import {getCode, makeRequest} from "../../utils/request/requestUtil"
import {useStore} from "vuex";

const store = useStore();
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const number = ref("1.0.0");
const code = ref("");

/**
 * 绑定微信号
 */
const bindWechat = () => {
  const url = `${backendBaseInfo}/api/user/update/miniOpenId`;
  //先调用微信获取code
  getCode("weixin").then((res)=>{
    code.value = res.code;
  }).catch(()=>{
    console.log("code获取失败")
  });
  uni.getUserProfile({
    desc: 'WeiXin'
  }).then(res => {
    //用户点击允许按钮后的操作
    if (res){
      uni.showLoading({
        title: '登录加载中'
      });
      //再向后端发送请求
      makeRequest(url, "Post", {
        userId: store.state.user.loginUser.villager_id,
        code: code.value,
      }).then((e) => {
        if (e.data.code === 0) {
          uni.showToast({
            title: '绑定成功',
            icon: 'success',
          })
        } else {
          uni.showToast({
            title: '绑定失败',
            icon: 'error',
            duration: 2000,
          })
        }
      }).catch(()=>{
        console.log("后端请求失败");
      });
    }
  }).catch(err => {//拒绝微信登录显示错误信息
    console.log(err);
  });
  uni.hideLoading();//关闭加载
}


</script>


<style scoped lang="scss">
.all-settings {
  margin-bottom: 510rpx;
}

.number {
  text-align: center;
  font-size: 34rpx;

}
</style>
