<template>
  <view class="payment">
    <view class="header">
      <text>订单支付</text>
      <text>订单将在 {{ countdown }} 秒后取消</text>
    </view>
    <view class="body">
      <view class="item" v-for="product in cartProducts" :key="product.name">
        <text>{{ product.name }} x {{ product.cartCount }}</text>
        <text>{{ product.price * product.cartCount }} 积分</text>
      </view>
      <view class="total">
        <text>总积分: {{ totalPoints }}</text>
      </view>
      <view class="balance">
        <text>可用积分: {{ availablePoints }}</text>
      </view>
    </view>
    <view class="footer">
      <button @click="pay">确认支付</button>
      <button @click="cancel">取消订单</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {makeRequest} from "../../utils/request/requestUtil";
import {store} from "../../store";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
const cartProducts = ref<{ price: number; cartCount: number }[]>([]);
const availablePoints = ref<number>(0);
const countdown = ref<number>(15);
const countdownTimer = ref(); // 引入定时器引用
const orderID = ref<string | null>(null);

const totalPoints = computed<number>(() => {
  return cartProducts.value.reduce((total, product) => {
    return total + product.price * product.cartCount;
  }, 0);
});

const startCountdown = () => {
  countdownTimer.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownTimer.value);
      // 获取当前页面路径
      const currentPage = getCurrentPages()[getCurrentPages().length - 1];
      const currentRoute = currentPage.route;

      // 判断当前页面是否是 'pages/score/Payment'
      if (currentRoute === 'pages/score/Payment') {
        uni.navigateBack({
          delta: 1 // 返回上一级页面
        });
        uni.showToast({
          title: '订单已取消',
          icon: 'none'
        });
      } else {
        uni.showToast({
          title: '订单已取消',
          icon: 'none'
        });
      }
    }
  }, 1000);
};

const pay = () => {
  if (totalPoints.value > availablePoints.value) {
    uni.showToast({
      title: '积分不足，无法支付',
      icon: 'none'
    });
  } else {
    availablePoints.value -= totalPoints.value; // 扣除积分
    console.log("调用支付方法");
    processOrder();
    uni.showToast({
      title: '支付成功',
      icon: 'success',
      duration: 3000
    });
    clearInterval(countdownTimer.value);
    setTimeout(() => {
      uni.navigateBack({
        delta: 1
      });
    }, 1000); // 延迟1秒跳转
    // 处理支付成功的逻辑
  }
};

const processOrder = async () => {
  console.log(orderID.value);
  const res = await makeRequest(`${backendBaseInfo}/api/transactions/transaction/handle`, 'GET', {
    transactions_Id: orderID.value
  });
  if (res.data.code === 0) {
    console.log("处理成功！");
  } else {
    console.log("出错", res.data.message);
    console.log(orderID.value);
  }
};

const cancel = () => {
  uni.showToast({
    title: '订单已取消',
    icon: 'none'
  });
  clearInterval(countdownTimer.value); // 清除倒计时定时器
  uni.navigateBack({
    delta: 1 // 返回上一级页面
  });
  // 跳转回购物车或主页
};

onMounted(() => {
  startCountdown();
});

// 在页面加载时获取参数
onLoad((options: any) => {
  try {
    // 解码并解析传递的参数
    cartProducts.value = JSON.parse(decodeURIComponent(options.cartProducts || '[]'));
    orderID.value = options.orderID;
    availablePoints.value = options.availablePoints;
    console.log(availablePoints.value)
  } catch (e) {
    console.error('Failed to parse cartProducts or orderID:', e);
    cartProducts.value = [];
    orderID.value = null;
  }
  // 设置 availablePoints
  // availablePoints.value = Number(options.availablePoints);
});
</script>

<style scoped>
.payment {
  padding: 20px;
}

.header, .body, .footer {
  margin-bottom: 20px;
}

.item, .total, .balance {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
