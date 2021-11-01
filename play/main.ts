/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 16:36:56
 * @LastEditTime: 2021-11-01 16:36:57
 * @LastEditors: changqing
 * @Usage: 
 */
import { createApp } from "vue";
import App from "./app.vue";
import {ZIcon} from "@z-plus/components/icon";
import '@z-plus/theme-chalk/src/index.scss'
const app = createApp(App);

app.use(ZIcon);
app.mount("#app");