<template>
  <view>
    <view class="input-container">
      <text>任务内容:</text>
      <uni-easyinput type="text" v-model="taskContent" placeholder="请输入任务内容"/>
    </view>
    <view class="input-container">
      <text>积分规则:</text>
      <uni-data-picker
          placeholder="请选择积分规则"
          popup-title="请选择积分规则"
          :clear-icon="true"
          :localdata="rules"
          :ellipsis="true"
          @change="handleRuleChange"
          @nodeclick="handleRuleNodeClick"
      >
      </uni-data-picker>
    </view>
    <text class="text1">积分设置:</text>
    <uni-number-box v-model="taskPoints" type="number" subTitle="请输入积分">积分设置</uni-number-box>
    <view class="input-container">
      <text>截止时间:</text>
      <uni-datetime-picker type="datetime" v-model="deadline" :start="today"/>
    </view>
    <view class="button-container">
      <button @click="confirmPublish">确认发布</button>
      <button @click="resetFields">重置文本框</button>
    </view>
    <uni-popup ref="popup" type="dialog" position="center">
      <uni-popup-dialog
          ref="dialog"
          type="info"
          title="确认发布任务"
          content="确认发布任务吗？"
          :duration="2000"
          :before-close="true"
          @confirm="handleConfirm"
          @close="handleClose"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import {ref} from 'vue';
import UniDatetimePicker
  from "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue";
import UniEasyinput from "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue";
import UniPopupDialog from "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue";
import UniPopup from "../../uni_modules/uni-popup/components/uni-popup/uni-popup.uvue";
import UniNumberBox from "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue";
import UniDataPicker from "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.vue";
import {makeRequest} from "../../utils/request/requestUtil";
import {store} from "../../store";


const taskContent = ref('');
const taskPoints = ref('');
const deadline = ref('');
const popup = ref(null);
const dialog = ref(null);
const ruleID = ref('1');
const selectedRule = ref('');
const backendBaseInfo = store.getters['backendBaseInfo/getBackendBaseUrl'];

const today = new Date().toISOString().split('T')[0];

const rules = [
  {value: '1', text: '规则1'},
  {value: '2', text: '规则2'},
  // 添加更多规则
];

const confirmPublish = () => {
  if (!taskContent.value || !taskPoints.value || !deadline.value || !selectedRule.value) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none',
      duration: 2000
    });
    return;
  }
  // 显示对话框进行二次确认
  popup.value.open();
};

const handleConfirm = async () => {
  await makeRequest(`${backendBaseInfo}/api/tasksExamine/add`, 'POST', {
    taskContent: taskContent.value,
    pointsValue: taskPoints.value,
    deadline: deadline.value,
    ruleId: ruleID.value
  }).then((res) => {
    if (res.data.code === 0) {
      console.log("上传成功！");
      console.log('任务内容:', taskContent.value);
      console.log('任务积分:', taskPoints.value);
      console.log('截止时间:', deadline.value);
      resetFields();
    }
  }).catch((error) => {
    console.log("error:", error.message)
  })

  popup.value.close();
};

const handleClose = () => {
  // 用户点击取消按钮后的逻辑
  popup.value.close();
};

const resetFields = () => {
  taskContent.value = '';
  taskPoints.value = '';
  ruleID.value = '';
  deadline.value = '';
  selectedRule.value = '';
};

const handleRuleChange = (e) => {
  const selected = e.detail.value;
  selectedRule.value = selected.text;
  ruleID.value = selected.value;
};

const handleRuleNodeClick = (node) => {
  selectedRule.value = node.text;
  ruleID.value = node.value;
};
</script>

<style scoped lang="scss">
.input-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  text {
    margin-bottom: 5px;
    font-weight: bold;
  }
}

.text1 {
  margin-bottom: 5px;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    flex: 1;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
