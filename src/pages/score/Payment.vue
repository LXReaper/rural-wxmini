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

<script setup>
import { ref, onMounted, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const cartProducts = ref([]);
const availablePoints = ref(100); // 默认100积分
const countdown = ref(3);
const countdownTimer = ref(null); // 引入定时器引用

const totalPoints = computed(() => {
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
onLoad((options) => {
  try {
    cartProducts.value = JSON.parse(decodeURIComponent(options.cartProducts || '[]'));
  } catch (e) {
    console.error('Failed to parse cartProducts:', e);
    cartProducts.value = [];
  }
  availablePoints.value = Number(options.availablePoints) || 100; // 支持传递参数，但默认是100积分
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
