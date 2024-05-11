<template>

  <view class="all-settings">
    <button class="b00">
      账号与安全
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b01">
      通用
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b02">
      关于小程序
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b03">
      权限
      <uni-icons type="right" size="20"></uni-icons>
    </button>

    <button class="b04">
      帮助与反馈
      <uni-icons type="right" size="20"></uni-icons>
    </button>

  </view>

  <view class="number">版本号：{{number}}</view>


</template>

<script>

import {defineComponent} from "vue";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";

export default defineComponent({
  components: {UniIcons}
})
</script>


<style scoped lang="scss">
.all-settings{
  margin-bottom: 510rpx;
}

.number{
  text-align: center; font-size: 34rpx;

}
</style>
