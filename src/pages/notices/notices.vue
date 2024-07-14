<template>
  <view>
    <scroll-view>
      <!--  搜索框  -->
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="请输入搜索内容" clearButton="auto" cancelButton="none"
                      @confirm="search"/>

      <uni-notice-bar show-icon scrollable :text="noticeInfo"/>

      <swiper class="swiper-style" circular="true" autoplay="true" interval="10000" duration="200"
              indicator-dots="true">
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/大米.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/盐.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/金龙鱼油.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
        <swiper-item class="item">
          <image src="/static/images/notices/advertisements/饲料.jpg" class="image-swiper-style"
                 mode="aspectFill"></image>
        </swiper-item>
      </swiper>

      <button class="button1">
        <uni-icons type="help" size="20">常见问题</uni-icons>
      </button>

      <view style="display: flex" id="button2">
        <button class="button21">
          <uni-icons type="calendar" size="21" @click="openDrawer">历史公告</uni-icons>
        </button>
        <!--        <uni-drawer ref="drawer" mode="left" :show="showDrawer" @close="closeDrawer">-->
        <!--          &lt;!&ndash; 抽屉中的内容 &ndash;&gt;-->
        <!--          <view style="padding: 10px;">-->
        <!--            这是抽屉内容-->
        <!--          </view>-->
        <!--        </uni-drawer>-->
        <button class="button22">
          <uni-icons type="compose" size="21">调查问卷</uni-icons>
        </button>
      </view>

      <uni-section title="推广栏目" type="line">
        <uni-card v-for="item in promotionItems" :key="item.id">
          <!--          <image :cover="item.url" style="width: 100%;cursor: pointer;" :src="item.url"></image>-->
          <view class="recommend-title">{{ item.title }}</view>
          <view class="recommend-description">{{ item.description }}</view>
          <view slot="actions" class="card-actions">
            <view class="card-actions-item" @click="actionsClick('分享')" style="cursor: pointer">
              <uni-icons type="redo" size="18" color="#999" class="card-actions-item-text">
                <text style="cursor: pointer">分享</text>
              </uni-icons>
            </view>
            <view class="card-actions-item" @click="actionsClick('点赞')" style="cursor: pointer">
              <uni-icons type="heart" size="18" color="#999" class="card-actions-item-text">
                <text style="cursor: pointer">点赞</text>
              </uni-icons>
            </view>
            <view class="card-actions-item" @click="actionsClick('评论')" style="cursor: pointer">
              <uni-icons type="chat" size="18" color="#999" class="card-actions-item-text">
                <text style="cursor: pointer">评论</text>
              </uni-icons>
            </view>
          </view>
        </uni-card>
      </uni-section>
      <!--      <view><uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message></view>-->
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import UniIcons from "../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import UniSearchBar from "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue";
import UniNoticeBar from "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.vue";
import UniSection from "../../uni_modules/uni-section/components/uni-section/uni-section.vue";
import UniCard from "../../uni_modules/uni-card/components/uni-card/uni-card.vue";
import {listAnnouncementsVoByPageUsingPost} from "../../utils/request/announcementsServicesUtils"

declare const uni: any;
/**
 * 基本变量
 * */
const promotionItems = ref([
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
]);
const imageList = ref([]);
const searchData = ref('');
//通知栏
const noticeInfo = ref('环境整治活动：本周六（日期），我们将组织环境整治活动，希望能够共同清理村庄周边的垃圾，美化我们的家园。活动时间为上午9点至中午12点，地点集合在村委会大门口，请各位村民准时参加。');
const showDrawer = ref(false);
//总数
const total = ref(0);
//是否加载
const loading = ref(true);
//查询条件
const queryParams = ref({
  pageSize: 50,
  current: 1,
  title: "",
  announcement_type: "announcement_announcement",
  content: "",
  updated_user_name: "",
  user_name: "",
});

/**
 * 函数
 * */
function onLoad() {
  this.getImagesFromFolder();
}

const search = (res) => {
  uni.showToast({
    title: '搜索：' + res.value,
    icon: 'none'
  })
};
const handQuery = () => {
  listAnnouncementsVoByPageUsingPost(queryParams.value).then((res) => {
    if (res.data.code === 0) {
      searchData.value = res.data.data.records;
      total.value = res.data.data.total;
      console.log(searchData.value);
    } else {
      uni.showToast({
        title: '公告信息加载失败，' + res.data.message,
        icon: 'error',
      });
    }
  }).catch((error) => {
    uni.showToast({
      title: '公告信息请求错误，' + error,
      icon: 'error',
    })
  })
};
onMounted(() => {
  handQuery();
});
const openDrawer = () => {//开启抽屉触发的事件
  this.showDrawer = true;
};
const closeDrawer = () => {// 关闭抽屉触发的事件
  this.showDrawer = false;
};
// const jump = () => {
//   wx.navigateTo({
//     url: 'view/inews/qq/com'
//   });
//   this.uni.showToast({
//     title:"aaa",
//     icon:'none'
//   })
// };
const submitData = (e) => {
  this.searchData = '';
  uni.showToast({
    title: '搜索成功', // Toast提示框标题
    icon: 'success', // Toast提示框图标类型
    duration: 2000, // Toast提示框显示时间(毫秒)
    success: () => {
    }, // 点击提示框关闭时执行的回调函数(可选)
    fail: () => {
    }, // 点击提示框关闭时执行的回调函数(可选)
    complete: () => {
    }, // 点击提示框关闭时执行的回调函数(可选)
  });
  this.searchData = ''
}
const actionsClick = (text) => {
  if (text === '分享') {
    uni.showActionSheet({
      itemList: ['分享到微信', '分享到朋友圈', '复制链接'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex === 0) {
            // TODO: 处理分享到微信的逻辑
            uni.showToast({title: '分享到微信'});
          } else if (res.tapIndex === 1) {
            // TODO: 处理分享到朋友圈的逻辑
            uni.showToast({title: '分享到朋友圈'});
          } else if (res.tapIndex === 2) {
            // TODO: 处理复制链接的逻辑
            uni.showToast({title: '复制链接'});
          }
        }
      }
    })
  } else if (text === '点赞') {

  } else {
  }
  uni.showToast({
    title: text,
    icon: 'none'
  })
}
const getImagesFromFolder = () => {
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
</script>

<style lang="scss">
.swiper-style {
  height: 300rpx;

  .item {
    padding: 0 30rpx;
    box-sizing: border-box;

    image {
      border-radius: 50rpx;
      width: 100%;
      height: 300rpx;
    }
  }
}

.button1 {
  margin: 30rpx 30rpx;
  border-radius: 40rpx;
  box-sizing: border-box;
  background-color: #f59d22;
  box-shadow: -5rpx -5rpx 15rpx rgba(0, 0, 0, 0.5);
}

.button1:active {
  background-color: #f57816;
}

#button2 {
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

  .button21:active {
    background-color: #cfff00;
  }

  .button22:active {
    background-color: #04cefc;
  }
}

.card-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1rpx solid #ccc;
  padding: 10rpx 0;

  .card-actions-item {
    padding: 0 20rpx;

    .card-actions-item-text {
      font-size: 20rpx;
    }
  }
}

.recommend-title {
  font-size: 50rpx; // 保持原大小
  padding-bottom: 20rpx; // 保持原大小
}

.recommend-description {
  font-size: 25rpx; // 保持原大小
}
</style>
