<template>
  <view>
    <scroll-view>
      <!--  搜索框  -->
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入搜索内容" clearButton="auto" cancelButton="none" @confirm="search" />

      <uni-notice-bar show-icon scrollable :text="noticeInfo"  />

      <swiper class="swiper-style" circular="true" autoplay="true" interval="10000" duration="200" indicator-dots="true">
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/大米.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/盐.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/金龙鱼油.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/饲料.jpg" class="image-swiper-style" mode="aspectFill"></image>
        </swiper-item>
      </swiper>

      <button class="button1">
        <uni-icons type="help" size="20">常见问题</uni-icons>
      </button>

      <view style="display: flex" id="button2">
        <button class="button21" @click="showDrawer('showLeft')">
          <uni-icons type="calendar" size="21" @click="openDrawer">历史公告</uni-icons>
        </button>
        <uni-drawer ref="drawer" mode="left" :show="showDrawer" @close="closeDrawer">
          <!-- 抽屉中的内容 -->
          <view style="padding: 10px;">
            这是抽屉内容
          </view>
        </uni-drawer>
        <button class="button22">
          <uni-icons type="compose" size="21">调查问卷</uni-icons>
        </button>
      </view>

      <uni-section title="推广栏目" type="line">
        <uni-card v-for="item in promotionItems" :key="item.id">
          <image cover="item.url" style="width: 100%;cursor: pointer;" :src="item.url" @click="jump"></image>
          <view class="recommend-title">{{item.title}}</view>
          <view class="recommend-description">{{item.description}}</view>
          <view slot="actions" class="card-actions">
            <view class="card-actions-item" @click="actionsClick('分享')" style="cursor: pointer">
              <uni-icons type="redo" size="18" color="#999" class="card-actions-item-text"><text style="cursor: pointer">分享</text></uni-icons>
            </view>
            <view class="card-actions-item" @click="actionsClick('点赞')" style="cursor: pointer">
              <uni-icons type="heart" size="18" color="#999" class="card-actions-item-text"><text style="cursor: pointer">点赞</text></uni-icons>
            </view>
            <view class="card-actions-item" @click="actionsClick('评论')" style="cursor: pointer">
              <uni-icons type="chat" size="18" color="#999" class="card-actions-item-text"><text style="cursor: pointer">评论</text></uni-icons>
            </view>
          </view>
        </uni-card>
      </uni-section>
<!--      <view><uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message></view>-->
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      promotionItems: [
        {
          id: 1,
          title: "特色商品",
          url: "https://img2.baidu.com/it/u=364631462,971296120&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=366",
          description: "限时特价优惠，购物满额免邮费！",
          // 其他字段
        },
        {
          id: 2,
          title: "新品上市",
          url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
          description: "全新产品抢先体验，限时特惠价！",
          // 其他字段
        },
        // 其他推广栏目
      ],
      imageList: [],
      searchData : '',
      noticeInfo : '环境整治活动：本周六（日期），我们将组织环境整治活动，希望能够共同清理村庄周边的垃圾，美化我们的家园。活动时间为上午9点至中午12点，地点集合在村委会大门口，请各位村民准时参加。',
      showDrawer: false
    };
  },
  onLoad() {
    this.getImagesFromFolder();
  },
  methods: {
    search(res) {
      uni.showToast({
        title: '搜索：' + res.value,
        icon: 'none'
      })
    },openDrawer() {
      this.showDrawer = true;
    },
    // 关闭抽屉触发的事件
    closeDrawer() {
      this.showDrawer = false;
    },
    // jump(){
    //   wx.navigateTo({
    //     url: 'view/inews/qq/com'
    //   });
    //   uni.showToast({
    //     title:"aaa",
    //     icon:'none'
    //   })
    // },
    submitData : function (e){
      this.searchData = '';
      uni.showToast({
        title: '搜索成功', // Toast提示框标题
        icon: 'success', // Toast提示框图标类型
        duration: 2000, // Toast提示框显示时间(毫秒)
        success: () => {}, // 点击提示框关闭时执行的回调函数(可选)
        fail: () => {}, // 点击提示框关闭时执行的回调函数(可选)
        complete: () => {}, // 点击提示框关闭时执行的回调函数(可选)
      });
      this.searchData = ''
    },actionsClick(text){
      if (text === '分享'){
        uni.showActionSheet({
          itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
          success: function(res) {
            if (!res.cancel) {
              if (res.tapIndex === 0) {
                // TODO: 处理分享到微信的逻辑
                uni.showToast({ title: '分享到微信' });
              } else if (res.tapIndex === 1) {
                // TODO: 处理分享到朋友圈的逻辑
                uni.showToast({ title: '分享到朋友圈' });
              } else if (res.tapIndex === 2) {
                // TODO: 处理复制链接的逻辑
                uni.showToast({ title: '复制链接' });
              }
            }
          }
        })
      }else if(text === '点赞'){

      }else {
      }
      uni.showToast({
        title:text,
        icon:'none'
      })
    },getImagesFromFolder() {
      // 假设 images 文件夹下存放了图片
      const folderPath = 'src/static/images/notices/advertisements';

      // 使用 uni.glob() 方法获取文件夹下的所有文件
      uni.glob({
        pattern: `${folderPath}/*`,
        success: res => {
          if (res.files) {
            // 遍历文件列表，获取图片信息
            res.files.forEach(file => {
              uni.getImageInfo({
                src: file.uri, // 图片路径
                success: info => {
                  this.imageList.push(info); // 将图片信息添加到 imageList 数组中
                  console.log(info.path);
                }
              });
            });
          }
        }
      });
    }
  },
}
</script>

<style lang="scss">
//轮播图
.swiper-style{
  height: 300rpx;
  .item{
      padding: 0 30rpx;
      box-sizing: border-box;
      image{
        border-radius: 50rpx;
        width: 100%;
        height: 300rpx;
      }
  }
}

//按钮
.button1 {/* 初始背景色 */
  margin: 30rpx 30rpx;
  border-radius: 40rpx;
  box-sizing: border-box;
  background-color: #f59d22;
  box-shadow: -5rpx -5rpx 15rpx rgba(0, 0, 0, 0.5);
}
.button1:active {/* 点击后的背景色 */
  margin: 30rpx 30rpx;
  border-radius: 40rpx;
  box-sizing: border-box;
  background-color: #f57816;
}

#button2 {
  //点击前效果
  .button21 {
    border-radius: 40rpx;
    background-color: #ffff00;
    padding: 5% 0;
    text-align: center;
    width: 310rpx;
    height: 150rpx;
    box-shadow: -5rpx -5rpx 15rpx rgba(0, 0, 0, 0.5);
  }
  .button22 {
    border-radius: 40rpx;
    background-color: #04fefc;
    padding: 5% 0;
    text-align: center;
    width: 310rpx;
    height: 150rpx;
    box-shadow: -5rpx -5rpx 15rpx rgba(0, 0, 0, 0.5);
  }
  //点击后效果
  .button21:active{
    border-radius: 40rpx;
    background-color: #cfff00;
    padding: 5% 0;
    text-align: center;
    width: 310rpx;
    height: 150rpx;
    box-shadow: -5rpx -5rpx 15rpx rgba(0, 0, 0, 0.5);
  }
  .button22:active{
    border-radius: 40rpx;
    background-color: #04cefc;
    padding: 5% 0;
    text-align: center;
    width: 310rpx;
    height: 150rpx;
    box-shadow: -5rpx -5rpx 15rpx rgba(0, 0, 0, 0.5);
  }
}

//推广
.card-actions {
  display: flex;
  margin: auto auto;
  align-items: center;
  border-top: 1rpx solid #ccc;
  .card-actions-item{
    padding: 20rpx 70.31rpx;
  }
}
.recommend-title {
  font-size: 50rpx;
  padding-bottom: 20rpx;
}
.recommend-description {
  font-size: 25rpx;
}
</style>
