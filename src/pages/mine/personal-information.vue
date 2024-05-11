<template>

  <view class="user">

    <view class="yourhead">
      <image class="head" @click="open" src="./static/store/lqj.jpg">
      </image>

      <uni-popup ref="popup" type="bottom">
        <view class="a01">
          <button class="photo">拍摄</button>
          <button class="choose">从相册选择</button>
          <button class="hide" @click="close">取消</button>
        </view>
      </uni-popup>

    </view>

    <view class="yourname">
      用户名在此处
    </view>

    <view class="yourID">
      用户ID在此处不可更改
    </view>

  </view>

</template>

<script>
export default{
  data(){
  },
  methods:{
    open(){
    this.$refs.popup.open('bottom')
    },
    close(){
    this.$refs.popup.close()
    }
  }
}
</script>

<style scoped lang="scss">
.user{
  background-color: white;
}
.head{
  border: white;
  border-radius: 180rpx;
  width:  325rpx;
  height: 325rpx;
  margin-left: 200rpx; // align-items: center; display: flex;都无法使头像居中？？
}
.yourhead{
  justify-content: center;
  align-items: center;
}
.choose{
  background-color: #ffffff;
}
.hide{
  background-color: #ffffff;
}
</style>
