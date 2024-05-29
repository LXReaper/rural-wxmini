<template>
  <view class="category">
    <view v-for="(category, index) in categories" :key="index" @click="selectCategory(category)" :class="{ active: category === selectedCategory }">
      {{ category }}
    </view>
  </view>
  <view class="leaderboard">
    <view class="title">{{ selectedCategory }}排行榜</view>
    <view class="top-three">
      <view v-for="(item, index) in topThree" :key="item.id" class="top-item">
        <view class="rank">#{{ index + 1 }}</view>
        <view class="name">{{ item.name }}</view>
        <view class="score">{{ item.score }}</view>
      </view>
    </view>
    <view class="leaderboard-list">
      <view v-for="(item, index) in remainingItems" :key="item.id" class="leaderboard-item">
        <view class="rank">{{ index + 4 }}</view><!-- index + 4 因为前三名已经显示，所以从第4开始 -->
        <view class="name">{{ item.name }}</view>
        <view class="score">{{ item.score }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

// 设置分类
const categories = ref(['总分', '卫生', '考察', '贡献']);

// 设置数据
const items = ref({
  '总分': [
    { id: 1, name: 'Alice', score: 300 },
    { id: 2, name: 'Bob', score: 250 },
    { id: 3, name: 'Charlie', score: 200 },
    { id: 4, name: 'David', score: 150 },
    { id: 5, name: 'Eve', score: 100 },
  ],
  '卫生': [
    { id: 1, name: 'Frank', score: 280 },
    { id: 2, name: 'Grace', score: 270 },
    { id: 3, name: 'Heidi', score: 260 },
    { id: 4, name: 'Ivan', score: 220 },
    { id: 5, name: 'Judy', score: 190 },
  ],
  '考察':[
    { id: 1, name: 'Frank', score: 180 },
    { id: 2, name: 'Grace', score: 270 },
    { id: 3, name: 'Heidi', score: 60 },
    { id: 4, name: 'Ivan', score: 370 },
    { id: 5, name: 'Judy', score: 190 },
  ],
  '贡献':[
    { id: 1, name: 'Frank', score: 10 },
    { id: 2, name: 'Grace', score: 70 },
    { id: 3, name: 'Heidi', score: 60 },
    { id: 4, name: 'Ivan', score: 30 },
    { id: 5, name: 'Judy', score: 90 },
  ],
});

// 存储当前选中的分类
const selectedCategory = ref('总分');

// 切换分类
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// 排序后的数据
const sortedItems = computed(() => {
  return items.value[selectedCategory.value].sort((a, b) => b.score - a.score);
});

// 前三名
const topThree = computed(() => {
  return sortedItems.value.slice(0, 3);
});

// 剩余名次
const remainingItems = computed(() => {
  return sortedItems.value.slice(3);
});
</script>

<style scoped>
.category {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f8f8f8;
}
.category view {
  cursor: pointer;
  padding: 10px;
}
.category view.active {
  font-weight: bold;
  color: #007BFF; /* 选中状态颜色 */
}

.leaderboard {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.top-three, .leaderboard-list {
  list-style: none;
  padding: 0;
}

.top-item, .leaderboard-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.top-item {
  background-color: #f2f2f2; /* 前三名的背景颜色可以不同 */
}

.top-item:last-child, .leaderboard-item:last-child {
  border-bottom: none;
}

.rank {
  font-weight: bold;
}

.name {
  flex-grow: 1;
  margin-left: 10px;
}

.score {
  font-weight: bold;
}
</style>
