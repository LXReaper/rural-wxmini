<template>
  <view v-for="(item, i) in productList" :key="i" style="margin-top: 1vh">
    <view style="display: flex;gap: 2vw;border: 1px solid #ddd;box-shadow: 0 0 10px rgba(1,1,1,0.2);padding: 1vh 2vw">
      <view style="width: 30vw;height: 15vh">
        <image :src="item.product_Image"></image>
      </view>
      <view style="flex-direction: column">
        <view style="font-size: 4vw;">{{item.product_name}}</view>
        <view style="font-size: 3vw; color: rgb(153, 153, 153);">剩余{{item.stock_quantity}}份</view>
        <view style="display: flex;margin-top: 5vh">
          <view style="color: #d9a552">
            {{item.price}}分
          </view>
          <view
              style="
                position: absolute;
                margin-left: 43vw;
                padding-left: 2.3vw;
                padding-top: 0.1vh;
                border: 1px solid #d9a552;
                color: #d9a552;
                border-radius: 20px;
                height: 4vh;
                width: 12vw;
              "
              @click="navigateToScorePage"
          >
            查看
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
// 跳转到积分商城页面
import {listProductsByPageUsingPost} from "../../utils/request/ProductsControllerServiceUtils";
import {ref, onMounted} from "vue";

//查询请求参数
const queryParam = ref({
  current: 1,
  pageSize: 4,
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
//查询得到的商品列表
const productList = ref([]);

const navigateToScorePage = () => {
  uni.navigateTo(
      {
        url: "/pages/score/scoreHomePage"
      }
  )
}

const handleQuery = () => {
  listProductsByPageUsingPost(queryParam.value).then(res => {
    if (res.data.code === 0) {
      productList.value = res.data.data.records;
    } else {
      uni.showToast({
        title: '商品加载失败',
        icon: 'error',
        duration: 2000
      })
    }
  })
}
onMounted(() => {
  handleQuery();
})
</script>


<style scoped lang="scss">
</style>
