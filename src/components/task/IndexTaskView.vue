<template>
  <view style="text-align: right">
    <text style="margin-right: 6vw;color: rgb(155, 155, 155);">更多</text>
  </view>
  <view class="IndexTaskView">
    <view v-for="(task, i) in taskList" :key="i">
      <view class="task-card">
        <view>
          <text style="font-size: 5vw;font-weight: bolder;">{{ task.task_content.substring(0, 6) }}</text>
          <text style="font-size: 4.5vw">{{ task.task_content.length > 6 ? "..." : "" }}</text>
        </view>
        <view style="margin-top: 3vh">
          <view style="font-size: 3.5vw;font-family: '楷体', 'KaiTi', STKaiti, '华文楷体', sans-serif;">需要{{ task.all_Num }}人</view>
          <view style="font-size: 3.5vw;font-family: '楷体', 'KaiTi', STKaiti, '华文楷体', sans-serif;">目前{{ task.join_Num }}人</view>
        </view>
        <view style="color: #ff8a18;margin-top: 9vh">
          {{ task.points_value / task.all_Num }}积分/人
        </view>
        <view style="font-size: 3vw;position: absolute;margin-left: 11vw;">
          {{ moment(task.publish_date).format("YYYY年MM月DD日") }}
        </view>
      </view>
    </view>
  </view>
  <!--    加一行-->
  <view style="height: 2vh"></view>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {listTasksVoByPageUsingPost} from "../../utils/request/TasksControllerServiceUtils";
import moment from "moment";

//任务查询参数
const queryParam = ref({
  current: 1,
  pageSize: 4,
  all_Num: "",
  deadLine: "",
  join_Num: "",
  materialId: "",
  pointsValue: "",
  publishDate: "",
  ruleId: "",
  sortField: "",
  sortOrder: "",
  taskContent: "",
  taskId: "",
  updateDate: "",
  updateUserName: "",
  userName: "",
});
//任务查询结果列表
const taskList = ref([]);
const handleQuery = () => {
  listTasksVoByPageUsingPost(queryParam.value)
      .then(res => {
        if (res.data.code === 0) {
          taskList.value = res.data.data.records;
        } else {
          uni.showToast({
            title: '任务加载失败',
            icon: 'error',
            duration: 2000
          })
        }
      });
}
onMounted(() => {
  handleQuery();
})
</script>

<style scoped lang="scss">
.IndexTaskView {
  display: inline-flex;
  flex-wrap: wrap;
  position: relative;
}

/*每个任务栏*/
.task-card {
  background-color: white;
  width: 40vw;
  height: 30vh;
  margin-left: 7vw;
  margin-top: 2vh;
  padding: 2vh 3vw;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(1, 1, 1, 0.2);
}
</style>
