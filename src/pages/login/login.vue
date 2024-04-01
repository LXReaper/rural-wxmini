<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view>
    <view>
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-column">
          <view class="title">开关</view>
          <view>
            <switch name="switch" />
          </view>
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">radio</view>
          <radio-group name="radio">
            <label>
              <radio value="radio1" /><text>选项一</text>
            </label>
            <label>
              <radio value="radio2" /><text>选项二</text>
            </label>
          </radio-group>
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">checkbox</view>
          <checkbox-group name="checkbox">
            <label>
              <checkbox value="checkbox1" /><text>选项一</text>
            </label>
            <label>
              <checkbox value="checkbox2" /><text>选项二</text>
            </label>
          </checkbox-group>
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">滑块</view>
          <slider value="50" name="slider" show-value></slider>
        </view>

        <view class="uni-form-item uni-column">
          <view class="title">输入</view>
          <input class="uni-input" name="输入" placeholder="请输入手机号" />
        </view>

        <view class="uni-btn-v">
          <button class="button_style" form-type="submit">登录</button>
          <button type="default" form-type="reset">重置</button>
        </view>
      </form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();//阻止表单提交
      uni.switchTab({ url: '/pages/index/index' })
    },
    formReset: function(e) {
      console.log('清空数据')
    }
  }
}
</script>

<style lang="scss">
.uni-form-item .title {
  padding: 20rpx 0;
}
.button_style{
  background-color: #4cd964;
  color: white;
}
</style>
