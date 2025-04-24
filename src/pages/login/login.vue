<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view id="content">
    <view class="bg">
      <view class="loginBox">
        <h3 style="text-align: center;font-weight: bolder;font-size: 7vw">登 录</h3>
        <view class="inputBox">
          <view class="ipt">
            <input :prefixIcon="'contact'" type="text" v-model="userAccount"
                   class="inputEasy"
                   maxlength="50"
                   placeholder="请输入账号或手机号"/>
          </view>
          <view class="ipt">
            <input type="password" v-model="userPassword" class="inputEasy"
                   placeholder="请输入密码"/>
          </view>
          <view class="forgetPwd">
            <span style="cursor: pointer" @click="losePassword">忘记密码</span>
            <span style="cursor: pointer">没有账号，去注册</span>
          </view>
          <button @tap="loginHandle" class="loginButton">登录</button>
        </view>
        <view class="tipBox">
          <view class="txt">
            —— 其他账号登录 ——
          </view>
          <view class="otherUser">
            <uni-icons type="phone-filled" size="40" color="rgb(111,111,250)"/>
            <uni-icons type="qq" size="40" color="rgb(66,157,250)"/>
            <uni-icons type="weixin" size="40" color="rgb(2,187,17)" @click="getUserProfile"/>
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
import {ref, onMounted} from 'vue';
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import {debounce} from "../../utils/debounce_Throttle";
import {readStorageData, setStorageData} from "../../utils/storage/storageUtils";
import {store} from "../../store";
import {makeRequest} from "../../utils/request/requestUtil";
import {initWebSocket} from "../../utils/socket/websocketConnectionUtil";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const code = ref("");//当前appId拿到的临时code
const userData = ref([]);
const userAccount = ref("");
const userPassword = ref("");
//账号密码登录函数。。。
const userLogin = () => {
  if (!userAccount.value || !userPassword.value) {
    uni.showToast({
      title: "用户账号或密码为空!",
      icon: "error"
    })
    return;
  }
  makeRequest(`${backendBaseInfo}/api/user/login`, 'POST', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  }).then((res) => {
    //请求成功
    userData.value = res.data.data;
    if (res.data.code === 0) {
      //登录成功
      let cookie = res.header["Set-Cookie"];
      if (cookie && !String(cookie).startsWith("SESSION=;")){
        console.log(res.header["Set-Cookie"])
        wx.setStorageSync("cookie", res.header["Set-Cookie"]);//存cookie信息
      }
      setStorageData(userData);
      //连接服务器
      initWebSocket();//连接后端
    } else {
      uni.showToast({
        title: res.data.message,
        icon: "error"
      })
    }
  }).catch((error) => {
    //请求失败
    console.error('请求错误:', error);
  });
};
const userLoginDebounce = debounce(userLogin, 500);//防抖
//钩子函数,在初始化登录页面时触发 tip:如果不需要一进入小程序就执行微信登录操作，可以将以下函数中的内容注释掉
onMounted(() => {
  // 调用函数以读取存储数据
  readStorageData();
  // initWebSocket();//连接后端
});
/**
 * 执行登录
 */
//账号密码登录
const loginHandle = function () {
  userLoginDebounce();
};

/**
 * 微信登录
 */
const getUserProfile = () => {
  //调用微信获取code
  uni.login({
    provider: 'weixin',
    success: (logRes) => {
      code.value = logRes.code
    }, fail: (error) => {
      console.log("code获取失败:", error);
    }
  });
  //再打开微信登录的下方抽屉
  uni.getUserProfile({
    desc: 'WeiXin'
  }).then(res1 => {
    //用户点击允许按钮后的操作
    if (res1) {
      let userMsgHave = JSON.parse(res1.rawData);//用户数据拿到对象
      // console.log(userMsgHave);
      console.log(userMsgHave.avatarUrl);//显示头像微信url
      uni.showLoading({
        title: '登录加载中'
      });
      if (res1.errMsg.includes("getUserProfile:ok")) {
        // console.log("codeLogin", code.value);//显示code
        let url = `${backendBaseInfo}/api/user/login/wx_miniApp`;
        //请求后端微信登录接口
        makeRequest(url, "GET", {code: code.value}).then(res => {
          if (res.data.code === 0) {
            /**登录成功*/
            // 将Proxy类中的数据转成一个新的JavaScript对象赋值给userData.value
            userData.value = JSON.parse(JSON.stringify(res.data.data));
            console.log(res)
            console.log(res.data.data)
            // console.log(res.header["Set-Cookie"])
            if (res.header["Set-Cookie"]) wx.setStorageSync("cookie", res.header["Set-Cookie"]);//存cookie信息
            // console.log(userData.value)//userData中的数据
            uni.hideLoading();//关闭加载

            //将数据保存到本地
            setStorageData(userData);
            //连接服务器
            if (store.state.user.loginUser?.villager_id) initWebSocket();//连接后端
          } else {
            uni.showToast({
              title: '微信登录失败',
              icon: 'none'
            })
            uni.hideLoading();//关闭加载
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
  }).catch(err => {//拒绝微信登录显示错误信息
    console.log(err);
  });
}

//直接登录
const formSubmit = () => {
  uni.switchTab({url: '/pages/index/index'});
};

//忘记密码
const losePassword = () => {
  uni.navigateTo({
    url: '/pages/login/losePassword'
  });
};
</script>

<style lang="scss" scoped>
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
  background: rgba(255, 255, 255, 0.4);
  //background-color: #fff;
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
  height: 7vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20rpx;
  background: rgba(245, 245, 245, 0);
  border-radius: 10rpx;
  padding-left: 10rpx;
  z-index: 2;
}

.inputEasy {
  margin-left: 20rpx;
  font-size: 28rpx;
  width: 67vw;
  box-shadow: 0 0.7vh 0.5vw rgba(8, 8, 8, 0.25);
}

.yzm {
  font-size: 24rpx;
  background: linear-gradient(to right, rgb(66, 157, 250), rgb(0, 170, 127));
  height: 60rpx;
  width: 15vw;
  line-height: 60rpx;
  text-align: center;
  border-radius: 10rpx;
  color: #fff;
}

.forgetPwd {
  font-size: 26rpx;
  //color: #b5b5b5;
  color: #c5f5c5;
  text-align: end;
  padding: 0 10rpx;
  display: flex;
  justify-content: space-between;

  :hover {
    color: #a5e5c5;
  }
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
  //color: #cbcbcb;
  color: #c5f5c5;
}

.otherUser .uni-icons {
  margin-left: 20rpx;
}

</style>
