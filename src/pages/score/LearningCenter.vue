<template>
  <view>
    <scroll-view scroll-x="true" bindscroll="handlescroll" scroll-with-animation="true">
      <view class="category-bar">
        <view v-for="(category, index) in categories" :key="index" @click="loadProducts(category)">
          {{ category }}
        </view>
      </view>
      <view class="product-list">
        <view v-for="(product, index) in products" :key="index" class="product-card">
          <image :src="product.image" class="product-image" />
          <view class="product-details">
            <view class="product-info">
              <text class="info-label">商品名称：</text>
              <text class="info-value">{{ product.name }}</text>
            </view>
            <view class="product-info">
              <text class="info-label">商品类型：</text>
              <text class="info-value">{{ product.type }}</text>
            </view>
            <view class="product-info">
              <text class="info-label">上架时间：</text>
              <text class="info-value">{{ product.time }}</text>
            </view>
            <view class="product-info">
              <text class="info-label">商品价格：</text>
              <text class="info-value">{{ product.price }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref(['首页', '衣服', '生活用品', '待定', '待定', '待定']);
const selectedCategory = ref('');
const products = ref([
  {
    image: '/static/images/notices/advertisements/大米.jpg',
    name: '1',
    type: '1',
    time: '1',
    price: '1'
  },
  {
    image: 'path/to/image2.jpg',
    name: '2',
    type: '2',
    time: '2',
    price: '2'
  },
  // 添加更多商品数据
]);

const loadProducts = (category) => {
  selectedCategory.value = category;
  // 根据选定的类别加载相应的商品
  // 这里可以调用相应的方法或接口来加载商品数据
};
</script>

<style lang="scss">
.category-bar {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f8f8f8;
}

.category-bar > view {
  cursor: pointer;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

.product-card {
  width: calc(50% - 10px); /* 让商品卡片占据一行的一半，并留有间隔 */
  margin-right: 10px;
  margin-bottom: 20px; /* 添加底部间隔 */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 150px; /* 调整商品图片高度 */
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-details {
  padding: 10px;
}

.product-info {
  display: flex;
  margin-bottom: 5px;
}

.info-label {
  font-weight: bold;
  width: 100px;
}

.info-value {
  flex: 1;
  color: #333;
}
</style>
