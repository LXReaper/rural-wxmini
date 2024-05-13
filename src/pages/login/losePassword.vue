<template>
  <view class="name" v-if="!hasLogin">
    <button @click="getUserProfile()" size="mini" class="authorizationBtn" type="primary">
      微信授权登录
    </button>
  </view>
  <view>
    <!--    &lt;!&ndash; 登录弹框 &ndash;&gt;-->
    <!--    <uni-popup :show="phoneModalShow" mode="center" border-radius="14">-->
    <!--      <view class="sq_box">-->
    <!--        <view>授权登录</view>-->
    <!--        <view>授权获取您的手机号</view>-->
    <!--        <view>-->
    <!--          <view class="agreement_warp">-->
    <!--            <view>登录代表您已同意</view>-->
    <!--            <view @click="agreementDetailHandle" style="color: #ff431e;">隐私政策</view>-->
    <!--          </view>-->
    <!--          <button style="width: 100%;" type="primary"-->
    <!--                  @getphonenumber="getPhoneNumber(this)" open-type="getPhoneNumber">-->
    <!--            微信快捷授权登录-->
    <!--          </button>-->
    <!--        </view>-->
    <!--      </view>-->
    <!--    </uni-popup>-->
  </view>

</template>
<script setup lang="ts">
import {getCurrentInstance, onMounted, ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import NotLoginAvatar from "../../components/mine/notLoginAvatar.vue";

const code = ref("");
const hasLogin = ref(false);
const phoneModalShow = ref(false);


const agreementDetailHandle = () => {
  console.log("")
}

const makeRequest = (url, method, data) => {
  // 实现请求逻辑，这里使用uni.request替代范例中的this.$request
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      method: method,
      data: data,
      success: res => resolve(res),
      fail: err => reject(err)
    });
  });
}
const getUserProfile = () => {
  //调用微信获取code
  uni.login({
    provider: 'weixin',
    success: (logRes) => {
      console.log(logRes.code)
      code.value = logRes.code
    }
  });
  uni.getUserProfile({
    desc: 'WeiXin'
  }).then(res => {
    if (res) {
      let userMsgHave = JSON.parse(res.rawData)
      console.log(JSON.parse(res.rawData));
      uni.showLoading({
        title: '登录加载中'
      });
      if (res.errMsg == "getUserProfile:ok") {
        console.log("codeLogin", code.value);
        let url = `http://localhost:8121/api/user/login/wx_miniApp`;
        makeRequest(url, "GET", {code: code.value}).then(res => {
          if (res.code == 0) {
            this.userRawData = userMsgHave; // 存储用户信息
            this.LoginCodeMsg.openId = res.data.openId
            this.LoginCodeMsg.sessionKey = res.data.sessionKey
            this.phoneModalShow = true;
            uni.hideLoading();
          } else {
            uni.showToast({
              title: '微信登录失败',
              icon: 'none'
            })
            uni.hideLoading();
          }
        })
      } else {
        uni.showToast({
          title: '登录失败请重试',
          icon: 'error',
          duration: 2000
        })
        uni.hideLoading();
      }
    }
  }).catch(err=>{
    console.log(err)
  });
}

const getPhoneNumber = (e) => {
  let phoneMsg = {
    encryptedData: e.detail.encryptedData,
    iv: e.detail.iv,
    openId: this.LoginCodeMsg.openId,
    sessionKey: this.LoginCodeMsg.sessionKey,
    avatar: this.userRawData.avatarUrl,
    nickName: this.userRawData.nickName,
    sex: this.userRawData.gender
  }
  this.request('wx/login', 'POST', phoneMsg).then(res => {
    this.phoneModalShow = false
    if (res.data.code == 200) {
      this.isLogin = true
      uni.showToast({
        title: '登录成功',
        icon: 'none'
      })
      this.hasLogin = true
      this.userId = res.data.busInfo.userId
      this.userInfo.level = res.data.busInfo.userType
      this.userInfo.nickName = res.data.busInfo.nickName
      this.userInfo.mobiler = res.data.busInfo.phoneNumber
      this.userInfo.avatar = res.data.busInfo.avatar
      console.log(JSON.stringify(this.userInfo))
      console.log(JSON.stringify(res.data.busInfo))
      //缓存登录状态和用户信息
      this.userInfo.token = res.data.token
      this.$store.state.busInfo = res.data.busInfo;
      this.$store.state.hasLogin = this.isLogin;
      this.$store.state.userInfo = this.userInfo;
      this.$store.state.token = res.data.token;
      //将当前代理的个人信息存入缓存中
      uni.setStorageSync('busInfo', res.data.busInfo)
      //token存缓存
      uni.setStorageSync('token', res.data.token)
      setTimeout(function () {
        uni.navigateBack()
      }, 2000)
      //加载顶部数据
      this.initTopShouYiData()
    } else {
      uni.showToast({
        title: '登录失败',
        icon: 'error',
        duration: 2000
      })
    }
  })
}

const logout = () => {
  uni.showModal({
    title: '提示',
    content: '请确认是否退出',
    success: (res) => {
      if (res.confirm) {
        this.$store.state.hasLogin = false;
        this.$store.state.userInfo = null;
        this.$store.state.busUser = null;
        uni.showToast({
          title: '退出登录成功',
          icon: 'none'
        })
        uni.redirectTo({
          url: '/pages/index/index'
        })
      }
    }
  })
}
</script>


<style scoped lang="scss">

</style>
