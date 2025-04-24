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
import {getLoginUser} from "../../utils/request/userServicesUtils";

const store = useStore();
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const number = ref("1.0.0");
const code = ref("");

/**
 * 绑定微信号
 */
const bindWechat = () => {
  let url = `${backendBaseInfo}/api/user/bind/miniOpenId`;
  //先调用微信获取code
  getCode("weixin").then((res) => {
    code.value = res.code;
  }).catch((error) => {
    console.log(JSON.stringify(error) + "，code获取失败")
  });
  uni.getUserProfile({
    desc: 'WeiXin'
  }).then(res => {
    //用户点击允许按钮后的操作
    if (res) {
      uni.showLoading({
        title: '登录加载中'
      });
      let userInfo = wx.getStorageSync('userInfo')
      //再向后端发送请求
      makeRequest(url, "Post", {
        userId: userInfo.villager_id,
        code: code.value,
      }).then((e) => {
        if (e.data.code === 0) {
          //绑定成功后先更新数据库中原有的数据
          url = `${backendBaseInfo}/api/user/update/my`;
          makeRequest(url, "POST", {
            userName: res.userInfo.nickName,
            userAvatar: res.userInfo.avatarUrl
          }).then(r => {
            //将数据库中用户数据与微信用户数据同步后才算绑定成功
            if (r.data.code === 0) {
              //更新下vuex中的用户信息
              getLoginUser().then(r=>{
                uni.showToast({
                  title: '绑定成功',
                  icon: 'success',
                })
              });
            } else console.log("用户数据与微信用户数据同步失败");
          }).catch(error => {
            console.log("用户更新请求错误");
          })
        } else {
          uni.showToast({
            title: e.data.message,
            icon: 'error',
            duration: 2000,
          })
        }
      }).catch(() => {
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
