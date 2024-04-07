<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view id="login">
    <view class="bg">
      <uni-row>
        <uni-col>
          <form @submit="formSubmit" @reset="formReset">
            <view class="uni-btn-v">
              <button class="phoneLogin" form-type="submit">手机登录</button>
              <button class="weChatLogin" @click="login">微信登录</button>
            </view>
          </form>
        </uni-col>
      </uni-row>

      <uni-row>
        <view style="margin-top: 0"></view>
      </uni-row>
    </view>
  </view>

</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    login() {//微信登录
      uni.login({
        provider: 'weixin',
        success: res => {
          // 获取登录凭证 res.code
          this.getPhoneNumber();
        },
        fail: err => {
          console.log('登录失败', err);
        }
      });
    },getPhoneNumber() {
      uni.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo'] && res.authSetting['scope.userLocation']) {
            // 已经授权，可以直接调用获取手机号的方法
            this.handleGetPhoneNumber();
          } else {
            // 需要引导用户进行手机号授权
          }
        }
      });
    },
    handleGetPhoneNumber() {
      uni.getUserInfo({
        provider: 'weixin',
        success: userInfo => {
          // 获取到用户信息后，可以处理手机号相关逻辑
          // ...
        }
      });
    },
    formSubmit: function (e) {
      e.preventDefault();//阻止表单提交
      uni.switchTab({url: '/pages/index/index'})
    },
// 点击登录按钮时触发的方法
    handleLogin: function () {
      // 调用微信登录接口获取 code
      wx.login({
        success: res => {
          const code = res.code;
          if (code) {
            // 调用微信登录接口获取用户信息
            wx.getUserProfile({
              desc: '用于完善会员资料',
              success: res => {
                const userInfo = res.userInfo;

                // 将 code 和用户信息发送到后端服务器进行登录验证
                wx.request({
                  url: 'http://localhost:8080/user/login',
                  method: 'POST',
                  data: {
                    code: code,
                    userInfo: userInfo
                  },
                  success: res => {
                    const {token} = res.data; // 假设后端返回包含 token 的数据
                    if (token) {
                      // 登录成功，保存 token到本地存储
                      wx.setStorageSync('token', token);

                      // 跳转到主页或其他页面
                      wx.navigateTo({
                        url: '/pages/index/index'
                      });
                    } else {
                      // 登录失败，显示提示信息
                      wx.showToast({
                        title: '登录失败，请重试',
                        icon: 'none'
                      });
                    }
                  },
                  fail: err => {
                    console.error('登录请求失败', err);
                  }
                });
              },
              fail: err => {
                console.error('获取用户信息失败', err);
              }
            });
          } else {
            console.error('获取登录凭证失败', res.errMsg);
          }
        },
        fail: err => {
          console.error('调用登录接口失败', err);
        }
      });
    }
  }
}
</script>

<style lang="scss">
#login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
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
  0% {background-position: 0 50%;}
  25% {background-position: 100% 50%;}
  50% {background-position: 100% 0;}
  75% {background-position: 50% 0;}
  100% {background-position: 0 50%;}
}

.uni-form-item .title {
  padding: 20rpx 0;
}

.uni-btn-v {
  display: flex;
  margin-top: 120%;
  //手机登录
  .phoneLogin {
    background-color: #ffffff;
    width: 300rpx;
    border-radius: 20rpx;
    color: #297fff;
    box-shadow: 0 10rpx 30rpx 0 rgba(41, 0, 255, 0.5);
  }

  .phoneLogin:active {
    background-color: #fffaef;
    width: 300rpx;
    border-radius: 20rpx;
    color: #297fff;
    box-shadow: 0 10rpx 30rpx 0 rgba(41, 0, 255, 0.5);
  }

  //微信登录
  .weChatLogin {
    background-color: #4cd964;
    width: 300rpx;
    border-radius: 20rpx;
    color: #297fff;
    box-shadow: 0 10rpx 30rpx 0 rgba(41, 0, 255, 0.5);
  }

  .weChatLogin:active {
    background-color: #4cdf74;
    width: 300rpx;
    border-radius: 20rpx;
    color: #297fff;
    box-shadow: 0 10rpx 30rpx 0 rgba(41, 0, 255, 0.5);
  }
}

</style>
