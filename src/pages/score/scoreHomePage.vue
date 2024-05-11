<template>
  <view>
    <scroll-view scroll-x="true" bindscroll="handlescroll" scroll-with-animation="true">
      <view class="category-bar">
        <view v-for="(category, index) in categories" :key="index" @click="loadProducts(category)">
          {{ category }}
        </view>
      </view>
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入商品名称" clear-button="auto" @click="search"></uni-search-bar>
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
  <view class="uni-container">
<!--    <uni-section title="基础用法" type="line">-->
<!--      <uni-goods-nav @click="onClick" />-->
<!--    </uni-section>-->
<!--    <uni-section title="自定义用法" type="line">-->
<!--      <uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"-->
<!--                     @buttonClick="buttonClick" />-->
<!--      <uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"-->
<!--                     @buttonClick="buttonClick" style="margin-top: 20px;" />-->
<!--    </uni-section>-->
    <view class="goods-carts">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
                     @buttonClick="buttonClick" />
    </view>

  </view>
</template>

<script setup>
import { ref } from 'vue';
import UniSection from "../../uni_modules/uni-section/components/uni-section/uni-section.vue";
import UniCard from "../../uni_modules/uni-card/components/uni-card/uni-card.vue";
import UniGoodsNav from "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue";
import UniSearchBar from "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue";
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
    image: '/static/images/notices/advertisements/金龙鱼油.jpg',
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
const options = ref([
  {
    icon: 'chat',
    text: '客服'
  },
  {
    icon: 'shop',
    text: '店铺',
    info: 2,
    infoBackgroundColor: '#007aff',
    infoColor: "#f5f5f5"
  },
  {
    icon: 'cart',
    text: '购物车',
    info: 2
  }
]);

const buttonGroup = ref([
  {
    text: '加入购物车',
    backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
    color: '#fff'
  },
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
    color: '#fff'
  }
]);

const customButtonGroup = ref([
  {
    text: '加入购物车',
    backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
    color: '#fff'
  },
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
    color: '#fff'
  }
]);

const customButtonGroup1 = ref([
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
    color: '#fff'
  }
]);

const onClick = (e) => {
  uni.showToast({
    title: `点击${e.content.text}`,
    icon: 'none'
  });
};

const buttonClick = (e) => {
  console.log(e);
  options.value[2].info++;
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
.example-body {
  padding: 0;
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
}

.goods-carts {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  /* #ifdef H5 */
  left: var(--window-left);
  right: var(--window-right);
  /* #endif */
  bottom: 0;
}
</style>
