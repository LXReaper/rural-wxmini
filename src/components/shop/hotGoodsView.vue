<template>
  <view>
    <view class="product-card" @click="navigateToScorePage">
      <image class="product-image" src="../static/images/notices/advertisements/金龙鱼油.jpg"></image>
      <text class="product-title">商品标题</text>
      <text class="product-description">商品描述</text>
      <text class="product-price">￥99.99</text>
    </view>
  </view>
</template>
<script setup>
// 跳转到积分商城页面
const navigateToScorePage = () => {
  uni.navigateTo(
      {
        url: "/pages/score/scoreHomePage"
      }
  )
}
</script>


<style scoped lang="scss">
/* 商品卡片 */
.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.product-price {
  font-size: 16px;
  color: #f00;
}
</style>
