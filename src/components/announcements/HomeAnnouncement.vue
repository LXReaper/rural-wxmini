<template>
  <!--  首页公告-->
    <swiper
        class="swiper-style"
        indicator-dots="true"
        autoplay="true"
        interval="10000"
        duration="200"
        circular="true"
    >
      <swiper-item
          class="item"
          v-for="(announcement, i) in announcementList"
          :key="i"
      >
        <view>{{announcement.title}}</view>
        <view>{{announcement.content}}</view>
      </swiper-item>
    </swiper>
</template>

<script setup lang="js">
import {listAnnouncementsVoByPageUsingPost} from "../../utils/request/announcementsServicesUtils";
import {ref, onMounted} from "vue";

//查询请求参数
const queryParam = ref({
  current: 1,
  pageSize: 6,
  announcement_id: "",
  announcement_type: "home_announcement",
  content: "",
  image_url: "",
  sortField: "",
  sortOrder: "",
  title: "",
  updated_user_name: "",
  user_name: "",
});
//查询得到的公告列表
const announcementList = ref([]);
//查询公告数据
const handleQuery = () => {
  listAnnouncementsVoByPageUsingPost(queryParam.value)
      .then(res => {
        if (res.data.code === 0){
          announcementList.value = res.data.data.records;
        }else {
          uni.showToast({
            title: '公告加载失败',
            icon: 'error'
          });
        }
      });
};
onMounted(() => {
  handleQuery();
})
</script>

<style scoped lang="scss">
/*公告轮播图*/
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
</style>
