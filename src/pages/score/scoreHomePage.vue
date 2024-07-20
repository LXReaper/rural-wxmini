<template>
  <view>
    <scroll-view scroll-y="true" bindscroll="handscroll" scroll-with-animation="true">
      <view class="category-bar">
        <view v-for="(category, index) in categories" :key="index">
          {{ category }}
        </view>
      </view>
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入商品名称" clear-button="auto" cancelButton="none"
                      @confirm="loadProductsDebounce"
                      @clear="loadProductsDebounce"
                      @blur="loadProductsDebounce"
                      v-model="queryParam.productName"
      ></uni-search-bar>
      <view class="product-list">
        <view v-for="(product, index) in products" :key="index" class="product-card">
          <image :src="product.image" class="product-image"/>
          <view class="product-details">
            <view class="product-info">
              <text class="info-label">名称：</text>
              <text class="info-value">{{ product.product_name }}</text>
            </view>
            <view class="product-info">
              <text class="info-label">类型：</text>
              <text class="info-value">{{ product.product_type }}</text>
            </view>
            <view class="product-info">
              <text class="info-label">上架时间：</text>
              <text class="info-value">{{ moment(product.shelf_time).format("YYYY年MM月DD日") }}</text>
            </view>
            <view class="product-info">
              <text class="info-label">商品价格：</text>
              <text class="info-value">{{ product.price }}</text>
            </view>
            <view class="product-info">
              <text class="info-label">剩余数量：</text>
              <text class="info-value">{{ product.stock_quantity }}</text>
            </view>
            <view class="cart-controls">
              <button class="cart-btn" v-if="!cart.cardProductsQuantity[product.product_id]" @click="addToCart(product.product_id,product)">加入购物车</button>
              <view class="quantity-controls" v-else>
                <button class="quantity-btn" @click="decreaseQuantity(product.product_id)">-</button>
                <text class="quantity">{{ cart.cardProductsQuantity[product.product_id] }}</text>
                <button class="quantity-btn" @click="increaseQuantity(index,product.product_id)">+</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  <view class="uni-container">
    <view class="goods-carts">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
                     @buttonClick="buttonClick"/>
    </view>
  </view>
  <view v-if="showCartDrawer" class="cart-drawer">
    <view class="cart-drawer-content">
      <view class="cart-drawer-header">
        <text>购物车</text>
        <button @click="toggleCartDrawer">关闭</button>
      </view>
      <view class="cart-drawer-body">
        <view v-for="(product, i) in productsList" :key="i" class="cart-product">
          <image :src="product.product_Image" class="cart-product-image"/>
          <view class="cart-product-details">
            <view class="cart-product-info">
              <text>{{ product.product_name }}</text>
              <text>{{ product.price }}</text>
              <text>数量: {{ productQuantityList[i] }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="js">
import {ref, reactive, computed, onMounted} from 'vue';
import {makeRequest} from "../../utils/request/requestUtil";
import {store} from "../../store";
import moment from "moment";
import UniSearchBar from "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue";
import UniGoodsNav from "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue";
import {listProductsByPageUsingPost} from "../../utils/request/ProductsControllerServiceUtils";
import {debounce} from "../../utils/debounce_Throttle";

const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];
//查询请求参数
const queryParam = ref({
  current: 1,
  pageSize: 10,
  price: "",
  productDescription: "",
  productId: "",
  productName: "",
  productType: "",
  shelfTime: "",
  sortField: "",
  sortOrder: "",
  stock_quantity: "",
  updateTime: "",
});
//查询得到的商品数据
const products = ref([]);
const categories = ref(['首页', '衣服', '生活用品', '待定', '待定', '待定']);
const showCartDrawer = ref(false);
const cart = ref({
  cardProducts: {},//购物车商品
  cardProductsQuantity: {},//购物车的商品数量
});
const productQuantityList = ref([]);//加入购物车的所有商品数量
const productsIDList = ref([]);//加入购物车的所有商品id
const productsList = ref([]);//加入购物车的所有商品
const orderID = ref();//订单id
const availablePoints = ref(''); // 假设用户的可用积分为1000

/**
 * 加载数据
 * @return {Promise<void>}
 */
const loadProducts = async () => {
  listProductsByPageUsingPost(queryParam.value).then(res => {
    if (res.data.code === 0) {
      products.value = res.data.data.records;
    } else {
      uni.showToast({
        title: '商品加载失败',
        icon: 'error',
        duration: 2000
      })
    }
  })
};
//防抖一下
const loadProductsDebounce = debounce(loadProducts,500);
onMounted(() => {
  loadProducts();
  searchPoint();
});

/**
 * 购物车
 * @param id 商品id
 * @param product 商品
 */
const addToCart = (id,product) => {
  if (!cart.value.cardProductsQuantity[id]) {
    cart.value.cardProducts[id] = product;
    cart.value.cardProductsQuantity[id] = 1;
  }
  console.log("id:" + id + "数量：" + cart.value.cardProductsQuantity[id]);
};
//添加数量
const increaseQuantity = (index,id) => {
  if (cart.value.cardProductsQuantity[id] === products.value[index].stock_quantity) return;//达到上限
  cart.value.cardProductsQuantity[id]++;
  console.log("id:" + id + "数量：" + cart.value.cardProductsQuantity[id]);
};
//减少数量
const decreaseQuantity = (id) => {
  if (!cart.value.cardProductsQuantity[id]) return ;//购物车该物品的数量已经是0就直接返回
  if (cart.value.cardProductsQuantity[id] === 1) delete cart.value.cardProducts[id];//数量减少后为0时，该加入购物车的这个商品标记为空
  cart.value.cardProductsQuantity[id]--;
  console.log("id:" + id + "数量：" + cart.value.cardProductsQuantity[id]);
};
//购物车抽屉控制开关
const toggleCartDrawer = () => {
  showCartDrawer.value = !showCartDrawer.value;
};

/**
 * 生成订单号
 * @return {Promise<void>}
 */
const createOrder = async () => {
  try {
    const res = await makeRequest(`${backendBaseInfo}/api/transactions/add`, 'POST', {
      productId: productsIDList.value,
      transactionQuantity: productQuantityList.value,
      user_id: store.state.user.loginUser.villager_id,
    });
    if (res.data.code === 0) {
      orderID.value = res.data.data;
      cart.value = {
        cardProducts: {},//购物车商品
        cardProductsQuantity: {},//购物车的商品数量
      };
      console.log("生成订单成功" + orderID.value);
      await uni.navigateTo({
            url: `/pages/score/Payment?cartProducts=${encodeURIComponent(JSON.stringify(productsList.value))}&productQuantityList=${encodeURIComponent(JSON.stringify(productQuantityList.value))}&availablePoints=${availablePoints.value}&orderID=${orderID.value}`
          }
      );
    } else {
      console.error("生成订单失败:", res.data.message || "未知错误");
    }
  } catch (error) {
    console.error("订单生成请求错误:", error);
  }
};

/**
 * 获取剩余积分
 * @return {Promise<void>}
 */
const searchPoint = async ()=>{
  await makeRequest(`${backendBaseInfo}/api/points/get/RemainingPoints`,'GET',{
    userId:store.state.user.loginUser.villager_id,
  }).then((res)=>{
    availablePoints.value = res.data.data;
    console.log(availablePoints.value);
  }).catch((error)=>{
    console.log("获取剩余积分请求错误:"+error.message);
  })
}

const options = ref([
  {
    icon: 'cart',
    text: '购物车',
    info: cart.value.cardProducts.length
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
    productQuantityList.value = Object.entries(cart.value.cardProductsQuantity).map(([key, productsQuantity]) => (productsQuantity));
    productsIDList.value = Object.entries(cart.value.cardProducts).map(([key, product]) => (product.product_id));
    productsList.value = Object.entries(cart.value.cardProducts).map(([key, product]) => (product));
    if (!productsIDList.value.length) {
      uni.showToast({
        title: '购物车为空，无法提交订单',
        icon: 'none'
      });
      return; // 阻止进一步执行
    }
    createOrder();
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
