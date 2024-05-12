// main.js

import {createSSRApp} from "vue";
import App from "./App.vue";
import {store} from "./store";

export function createApp() {
    const app = createSSRApp(App);

    // 注入 Vuex store 到应用中
    app.use(store);
    app.config.globalProperties.$backendBaseUrl = 'http://localhost:8121';
    app.config.globalProperties.$code = '';
    return {
        app,
        store,
    };
}
