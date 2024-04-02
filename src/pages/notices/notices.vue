<template>
  <view>
    <scroll-view>
      <!--  搜索框  -->
      <view class="search-container">
        <input confirm-type="search" v-model="searchData" @keydown.alt = "submitData" placeholder="请输入关键词" class="search-input" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import UniButton from '@dcloudio/uni-ui/lib/uni-button/uni-button.vue';
export default {
  data() {
    return {
      searchData : ''
    };
  },methods: {
    submitData : function (e){
      this.searchData = ''
    }
  },
}
</script>

<style lang="scss">
//搜索框的样式
.search-container {
  width: 85%; /* 设置搜索框容器的宽度 */
  height: 60rpx; /* 设置搜索框容器的高度 */
  background-color: #c0c0c0; /* 设置背景色 */
  border-radius: 40rpx; /* 设置圆角使其呈现为椭圆形 */
  display: flex;
  align-items: center;//文字居中
  padding: 0 20rpx; /* 设置内边距 */
  margin: 1% 5%;//上和左外边距
}
.search-input {
  flex: 1; /* 输入框占满剩余空间 */
  border: none; /* 清除输入框边框 */
  background: transparent; /* 清除输入框背景色 */
}
</style>
