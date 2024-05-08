// main.js

import {createSSRApp} from "vue";
import App from "./App.vue";

export function createApp() {
    const app = createSSRApp(App);
    app.config.globalProperties.$backendBaseUrl = 'http://localhost:8121';
    return {
        app,
    };
}
