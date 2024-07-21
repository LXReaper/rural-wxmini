<template>
  <view @click="showCartDrawer = false">
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
          <image :src="product.product_Image" class="product-image"/>
          <view class="product-details">
            <view class="product-info">
              <text class="info-value" style="font-weight: bolder">{{ product.product_name }}</text>
            </view>
            <view class="product-info">
              <text class="info-value" style="color: rgb(221, 68, 58);">{{ product.price }}分</text>
            </view>
            <view class="product-info">
              <view class="info-value">
                <text style="color: #b2b2b2;font-size: 3vw">已兑换{{ product.consumption_Num }}份</text>
              </view>
              <view class="info-value">
                <text style="color: #b2b2b2;font-size: 3vw">剩余{{ product.stock_quantity }}份</text>
              </view>
            </view>
            <view>
              <view class="cart-btn" v-if="!cart.cardProductsQuantity[product.product_id]"
                    @click="addToCart(product.product_id,product)">
                <uni-icons type="cart" size="25" color="#ffffff"></uni-icons>
              </view>
              <view class="quantity-controls" v-else>
                <view class="quantity-btn" style="padding-left: 2.9vw;background-color: #ff8a18" @click="decreaseQuantity(product.product_id)">
                  -
                </view>
                <view class="quantity">{{ cart.cardProductsQuantity[product.product_id] }}</view>
                <view class="quantity-btn"
                      :style="{
                        paddingLeft: '2.2vw',
                        backgroundColor: (cart.cardProductsQuantity[product.product_id] === product.stock_quantity ? '#b2b2b2' : '#ff8a18'),
                      }"
                      @click="increaseQuantity(index,product.product_id)"
                >+
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view style="height: 10vh;text-align: center">
      <text style="color: #999999">数据已加载完成</text>
    </view>
  </view>
  <!--  购物车以及购买-->
  <view class="uni-container">
    <view class="goods-carts">
      <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
                     @buttonClick="buttonClick"/>
    </view>
  </view>
  <view v-if="showCartDrawer" @blur="toggleCartDrawer" class="cart-drawer">
    <view class="cart-drawer-content">
      <view class="cart-drawer-header">
        <text style="font-weight: bolder">购物车</text>
        <uni-icons type="close" size="35" @click="toggleCartDrawer" style="padding-left: 1vw;padding-bottom: 1.3vh" />
      </view>
      <view class="cart-drawer-body" style="height: 50vh" v-if="productsList && productsList.length">
        <scroll-view scroll-y="true" bindscroll="handscroll" scroll-with-animation="true">
          <view v-for="(product, i) in productsList" :key="i" class="cart-product">
            <image :src="product.product_Image" class="cart-product-image"/>
            <view class="cart-product-details">
              <view class="cart-product-info">
                <view style="font-weight: bolder">{{ product.product_name }}</view>
                <view style="display: flex;margin-top: 4vh">
                  <text style="color: #ff8a18">{{ product.price }}分</text>
                  <view style="margin-left: 48vw;position: absolute">
                    <uni-number-box
                        v-model="cart.cardProductsQuantity[product.product_id]"
                        :min="1"
                        :max="product.stock_quantity"
                        :step="1"
                    />
                  </view>
                </view>
              </view>
            </view>
          </view>
          <!--          空一行-->
          <view style="height: 2vh"></view>
        </scroll-view>
      </view>
      <view v-else style="height: 50vh">
        <view style="text-align: center;margin-top: 5vh">选择您要兑换的商品</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="js">
import {ref, reactive, computed, onMounted} from 'vue';
import {makeRequest} from "../../utils/request/requestUtil";
import {store} from "../../store";
import UniSearchBar from "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue";
import UniGoodsNav from "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import UniNumberBox from "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue";
import {listProductsByPageUsingPost} from "../../utils/request/ProductsControllerServiceUtils";
import {debounce} from "../../utils/debounce_Throttle";
import {transactionsAddUsingPost} from "../../utils/request/TransactionsControllerServiceUtils";
import {getRemainingPointsByUserIdUsingGet} from "../../utils/request/PointsControllerServiceUtils";

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
const loadProductsDebounce = debounce(loadProducts, 500);
onMounted(() => {
  loadProducts();
  searchPoint();
});

/**
 * 购物车
 * @param id 商品id
 * @param product 商品
 */
const addToCart = (id, product) => {
  if (!cart.value.cardProductsQuantity[id]) {
    cart.value.cardProducts[id] = product;
    cart.value.cardProductsQuantity[id] = 1;
    getValidCartParam();//获取购物车cart的有效参数
  }
  console.log("id:" + id + "数量：" + cart.value.cardProductsQuantity[id]);
};
//添加数量
const increaseQuantity = (index, id) => {
  if (cart.value.cardProductsQuantity[id] === products.value[index].stock_quantity) {
    uni.showToast({
      title: '抱歉，该商品数量已达到库存上限',
      icon: 'none',
      duration: 2000
    })
    return;
  }//达到上限
  cart.value.cardProductsQuantity[id]++;
  getValidCartParam();//获取购物车cart的有效参数
  console.log("id:" + id + "数量：" + cart.value.cardProductsQuantity[id]);
};
//减少数量
const decreaseQuantity = (id) => {
  if (!cart.value.cardProductsQuantity[id]) return;//购物车该物品的数量已经是0就直接返回
  if (cart.value.cardProductsQuantity[id] === 1) delete cart.value.cardProducts[id];//数量减少后为0时，该加入购物车的这个商品标记为空
  cart.value.cardProductsQuantity[id]--;
  getValidCartParam();//获取购物车cart的有效参数
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
  transactionsAddUsingPost({
    productId: productsIDList.value,
    transactionQuantity: productQuantityList.value,
    user_id: store.state.user.loginUser.villager_id,
  }).then(res => {
    if (res.data.code === 0) {
      orderID.value = res.data.data;
      cart.value = {
        cardProducts: {},//购物车商品
        cardProductsQuantity: {},//购物车的商品数量
      };
      console.log("生成订单成功" + orderID.value);
      uni.navigateTo({
            url: `/pages/score/Payment?cartProducts=${encodeURIComponent(JSON.stringify(productsList.value))}&productQuantityList=${encodeURIComponent(JSON.stringify(productQuantityList.value))}&availablePoints=${availablePoints.value}&orderID=${orderID.value}`
          }
      );
    } else {
      console.error("生成订单失败:", res.data.message || "未知错误");
    }
  });
};

/**
 * 获取剩余积分
 * @return {Promise<void>}
 */
const searchPoint = async () => {
  getRemainingPointsByUserIdUsingGet({
    userId: store.state.user.loginUser.villager_id,
  }).then(res => {
    if (res.data.code === 0) {
      availablePoints.value = res.data.data;
      console.log(availablePoints.value);
    } else {
      console.error("查询剩余积分失败:", res.data.message || "未知错误");
    }
  })
}

/**
 * 购物车配置
 * @type {Ref<UnwrapRef<[{icon: string, text: string, info: number}]>>}
 */
const options = ref([
  {
    icon: 'cart',
    text: '购物车',
    info: computed(() => {
      //添加到购物车的数量
      let cnt = Object.values(cart.value.cardProductsQuantity).reduce((cnt, curVal) => cnt + curVal, 0);
      return cnt > 99 ? "99+" : cnt;
    })
  }
]);

const buttonGroup = ref([
  {
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
    color: '#fff'
  }
]);
//提交订单，点击立即购买按钮触发
const buttonClick = (e) => {
  if (e.content.text === '立即购买') {
    getValidCartParam();//获取购物车cart的有效参数
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
//打开购物车抽屉
const onClick = (e) => {
  if (e.content.text === '购物车') {
    getValidCartParam();//获取购物车cart的有效参数
    toggleCartDrawer();
  }
};
/**
 * 获取购物车cart的有效参数
 */
const getValidCartParam = () => {
  productQuantityList.value = Object.entries(cart.value.cardProductsQuantity).map(([key, productsQuantity]) => (productsQuantity));
  productsIDList.value = Object.entries(cart.value.cardProducts).map(([key, product]) => (product.product_id));
  productsList.value = Object.entries(cart.value.cardProducts).map(([key, product]) => (product));
}
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

/*商品列表*/
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
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.3);
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

.info-value {
  flex: 1;
  color: #000000;
}

.cart-controls {
  display: flex;
}

.cart-btn {
  background-color: #ff8502;
  border-radius: 50%;
  width: 8vw;
  height: 5vh;
  padding-top: 0.9vh;
  padding-left: 1.1vw;
  cursor: pointer;
}

/*购物车以及立即购买栏*/
.quantity-controls {
  display: flex;
}

.quantity-btn {
  color: #fff;
  font-size: 5vw;
  width: 8vw;
  height: 5vh;
  border-radius: 50%;
  cursor: pointer;
}

.quantity {
  margin: 1vh 3vw;
}

/*购物车*/
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
  background-color: #f7f7f7;
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
  overflow-y: auto;
}

.cart-product {
  background-color: white;
  display: flex;
  height: 12vh;
  width: 90vw;
  margin-left: 0.5vw;
  border-radius: 10px;
  box-shadow: 0 0.1vh 1vw rgba(0, 0, 0, 0.2);
  margin-top: 2vh;
}

.cart-product-image {
  width: 15vw;
  height: 10vh;
  object-fit: cover;
  margin-left: 2vw;
  margin-top: 1vh;
}

.cart-product-details {
  flex: 1;
}

.cart-product-info {
  flex-direction: column;
  margin-left: 2vw;
  margin-top: 1vh;
  justify-content: space-between;
}
</style>
