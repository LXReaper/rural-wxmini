<template>
  <view>
    <scroll-view scroll-y="true" bindscroll="handscroll" scroll-with-animation="true">
      <view class="category-bar">
        <view v-for="(category, index) in categories" :key="index" @click="loadProducts(category)">
          {{ category }}
        </view>
      </view>
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入商品名称" clear-button="auto" cancelButton="none" @click="search"></uni-search-bar>
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
            <view class="cart-controls">
              <button class="cart-btn" v-if="product.cartCount === 0" @click="addToCart(index)">加入购物车</button>
              <view class="quantity-controls" v-else>
                <button class="quantity-btn" @click="decreaseQuantity(index)">-</button>
                <text class="quantity">{{ product.cartCount }}</text>
                <button class="quantity-btn" @click="increaseQuantity(index)">+</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  <view class="uni-container">
    <view class="goods-carts">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
  <view v-if="showCartDrawer" class="cart-drawer">
    <view class="cart-drawer-content">
      <view class="cart-drawer-header">
        <text>购物车</text>
        <button @click="toggleCartDrawer">关闭</button>
      </view>
      <view class="cart-drawer-body">
        <view v-for="(product, index) in cartProducts" :key="index" class="cart-product">
          <image :src="product.image" class="cart-product-image" />
          <view class="cart-product-details">
            <view class="cart-product-info">
              <text>{{ product.name }}</text>
              <text>{{ product.price }}</text>
              <text>数量: {{ product.cartCount }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="js">
import { ref, reactive, computed } from 'vue';
import UniGoodsNav from "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue";
import UniSearchBar from "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue";

const categories = ref(['首页', '衣服', '生活用品', '待定', '待定', '待定']);
const selectedCategory = ref('');
const products = reactive([
  {
    image: '/static/images/notices/advertisements/大米.jpg',
    name: '1',
    type: '1',
    time: '1',
    price: '1',
    cartCount: 0
  },
  {
    image: '/static/images/notices/advertisements/金龙鱼油.jpg',
    name: '2',
    type: '2',
    time: '2',
    price: '2',
    cartCount: 0
  }
]);

const cartProducts = computed(() => products.filter(product => product.cartCount > 0));
const showCartDrawer = ref(false);

const loadProducts = (category) => {
  selectedCategory.value = category;
  const newProducts = [
    {
      image: '/static/images/notices/advertisements/金龙鱼油.jpg',
      name: '新商品',
      type: '新类型',
      time: '新时间',
      price: '新价格',
      cartCount: 0
    },
  ];
  products.push(...newProducts);
};

const addToCart = (index) => {
  products[index].cartCount = 1;
};

const increaseQuantity = (index) => {
  products[index].cartCount++;
};

const decreaseQuantity = (index) => {
  if (products[index].cartCount > 0) {
    products[index].cartCount--;
  }
  if (products[index].cartCount === 0) {
    products[index].cartCount = 0;
  }
};

const toggleCartDrawer = () => {
  showCartDrawer.value = !showCartDrawer.value;
};

const options = ref([
  {
    icon: 'cart',
    text: '购物车',
    info: computed(() => cartProducts.value.length)
  }
]);

const buttonGroup = ref([
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
    color: '#fff'
  }
]);
const buttonClick = (e) => {
  if (e.content.text === '立即购买') {
    if (cartProducts.value.length === 0) {
      uni.showToast({
        title: '购物车为空，无法提交订单',
        icon: 'none'
      });
      return; // 阻止进一步执行
    }

    const availablePoints = 1000; // 假设用户的可用积分为1000
    uni.navigateTo({
      url: `/pages/score/Payment?cartProducts=${encodeURIComponent(JSON.stringify(cartProducts.value))}&availablePoints=${availablePoints}`
    });
  }
};
const onClick = (e) => {
  if (e.content.text === '购物车') {
    toggleCartDrawer();
  }
  uni.showToast({
    title: `点击${e.content.text}`,
    icon: 'none'
  });
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
  width: calc(50% - 10px);
  margin-right: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 150px;
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

.cart-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.cart-btn {
  background-color: #ff8a18;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-btn {
  background-color: #ff8a18;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.quantity {
  margin: 0 10px;
}

.goods-carts {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.cart-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.cart-drawer-content {
  padding: 20px;
}

.cart-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.cart-drawer-body {
  max-height: 300px;
  overflow-y: auto;
}

.cart-product {
  display: flex;
  margin-bottom: 10px;
}

.cart-product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 10px;
}

.cart-product-details {
  flex: 1;
}

.cart-product-info {
  display: flex;
  justify-content: space-between;
}
</style>
