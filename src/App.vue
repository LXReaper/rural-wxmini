<script>


import {store} from "./store";
import {readStorageData} from "./utils/storage/storageUtils";
import {onShow} from "@dcloudio/uni-app";

export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  onLoad: function () {
  },
}
</script>

<style>
@import '@tuniao/tn-style/dist/uniapp/index.css';
/*每个页面公共css */
page {
  background-color: #EFF3FF;
}
</style>
