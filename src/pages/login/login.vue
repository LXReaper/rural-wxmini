<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <!--  <view id="login">-->
  <!--    <view class="bg">-->
  <!--      <uni-row>-->
  <!--        <uni-col>-->
  <!--          <form @submit="formSubmit" @reset="formReset">-->
  <!--            <view class="uni-btn-v">-->
  <!--              <button class="phoneLogin" form-type="submit">手机登录</button>-->
  <!--              <button class="weChatLogin" @click="login">微信登录</button>-->
  <!--            </view>-->
  <!--          </form>-->
  <!--        </uni-col>-->
  <!--      </uni-row>-->

  <!--      <uni-row>-->
  <!--        <view style="margin-top: 0"></view>-->
  <!--      </uni-row>-->
  <!--    </view>-->
  <!--  </view>-->
  <view id="content">
    <view class="bg">
      <view class="loginBox">
        <h3>登录</h3>
        <view class="inputBox">
          <view class="ipt">
            <uni-icons type="contact" size="24" color="rgb(247,120,172)"></uni-icons>
            <input type="text" v-model="userAccount" placeholder="请输入账号或手机号"/>
          </view>
          <view class="ipt">
            <uni-icons type="eye" size="24" color="rgb(247,120,172)"></uni-icons>
            <input type="safe-password" v-model="userPassword" placeholder="请输入密码"/>
          </view>
          <view class="ipt">
            <uni-icons type="checkmarkempty" size="24" color="rgb(66,157,250)"></uni-icons>
            <input type="text" value="" placeholder="请输入验证码"/>
            <view class="yzm" style="cursor: pointer" @click="formSubmit">
              验证码
            </view>
          </view>
          <view class="forgetPwd">
            <span style="cursor: pointer">忘记密码</span>
            <span style="cursor: pointer">没有账号，去注册</span>
          </view>
          <button @tap="loginHandle">登录</button>
        </view>
        <view class="tipBox">
          <view class="txt">
            —— 其他账号登录 ——
          </view>
          <view class="otherUser">
            <uni-icons type="phone-filled" size="40" color="rgb(111,111,250)"></uni-icons>
            <uni-icons type="qq" size="40" color="rgb(66,157,250)"></uni-icons>
            <uni-icons type="weixin" size="40" color="rgb(2,187,17)"></uni-icons>
          </view>
        </view>
      </view>

      <view class="tip">
        乡村治理小程序 by 102 2024
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref, onMounted, getCurrentInstance} from 'vue';

const {proxy} = getCurrentInstance();
const userAccount = ref("");
const userPassword = ref("");
//登录函数
const userLogin = () => {
  uni.request({
    url: `${proxy.$backendBaseUrl}/api/user/login`,
    method: 'POST',
    data: {
      userAccount: userAccount.value,
      userPassword: userPassword.value
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      console.log(res.data);
      if (res.data.code === 0) uni.switchTab({url: '/pages/index/index'});
    },
    fail: (error) => {
      console.error('请求错误:', error);
    }
  });
};
//钩子函数,在初始化登录页面时触发
onMounted(() => {
  userLogin();
  // wx.login({
  //   success: function (res) {
  //     if (res.code) {
  //       // 将获取的code发送给后端服务器
  //       wx.request({
  //         url: `${proxy.$backendBaseUrl}/api/user/login`, // 后端登录接口
  //         method: 'POST',
  //         data: {
  //           code: res.code
  //         },
  //         success: function (response) {
  //           console.log(response.data); // 处理后端返回的数据
  //         },
  //         fail: function (error) {
  //           console.error('请求失败：', error);
  //         }
  //       });
  //     } else {
  //       console.log('登录失败！' + res.errMsg);
  //     }
  //   }, complete(res: any) {
  //     console.log("com," + res)
  //   }
  // });
});
//执行登录
const loginHandle = function () {
  userLogin();
};

//直接登录
const formSubmit = () => {
  uni.switchTab({url: '/pages/index/index'});
};
</script>

<style lang="scss">
/**
* TODO
*/
#content {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    animation: coolAnimation 30s infinite;
    background: linear-gradient(45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
    background-size: 400% 400%;
  }
}

@keyframes coolAnimation {
  0% {
    background-position: 0 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 100% 0;
  }
  75% {
    background-position: 50% 0;
  }
  100% {
    background-position: 0 50%;
  }
}

.loginBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 90%;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 60rpx;
  box-sizing: border-box;
}

h3 {
  color: rgb(247, 120, 172);
  font-size: 40rpx;
  letter-spacing: 10rpx;
  margin-bottom: 40rpx;
}

.inputBox {
  //以后再加点东西吧

}

.ipt {
  height: 86rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  padding-left: 10rpx;
}

.ipt input {
  margin-left: 20rpx;
  font-size: 28rpx;
}

.ipt input {
  margin-left: 20rpx;
}

.yzm {
  font-size: 24rpx;
  background: linear-gradient(to right, rgb(66, 157, 250), rgb(0, 170, 127));
  height: 60rpx;
  width: 150rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 10rpx;
  color: #fff;
}

.forgetPwd {
  font-size: 26rpx;
  color: #b5b5b5;
  text-align: end;
  padding: 0 10rpx;
  display: flex;
  justify-content: space-between;
}

button {
  line-height: 85rpx;
  text-align: center;
  animation: cool 5s infinite;
  background: linear-gradient(to right, rgb(255, 170, 127), rgb(247, 120, 172), #23A6D5, #23D5AB);
  background-size: 400% 400%;
  border-radius: 40rpx;
  color: #fff;
  margin-top: 40rpx;
}

@keyframes cool {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 50%;
  }
}

.tip {
  text-align: center;
  font-size: 28rpx;
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f4f4f4;
}

.tipBox {
  text-align: center;
  margin-top: 100rpx;
}

.otherUser {
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
}

.txt {
  font-size: 28rpx;
  color: #cbcbcb;
}

.otherUser .uni-icons {
  margin-left: 20rpx;
}

</style>
