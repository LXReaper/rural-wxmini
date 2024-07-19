// main.js

import {createSSRApp} from "vue";
import App from "./App.vue";
import {store} from "./store";
export function createApp() {
    const app = createSSRApp(App);

    // 注入 Vuex store 到应用中
    app.use(store);
    return {
        app,
        store,
    };
}
