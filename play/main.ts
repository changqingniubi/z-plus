/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 16:36:56
 * @LastEditTime: 2021-11-03 15:29:47
 * @LastEditors: changqing
 * @Usage: 
 */
import { createApp } from "vue";
import App from "./app.vue";
//import {ZIcon} from "@z-plus/components/icon";
import ZPlus from "z-plus";
//import '@z-plus/theme-chalk/src/css/index.scss'
import 'z-plus/theme-chalk/css/index.css'
const app = createApp(App);

//app.use(ZIcon);
app.use(ZPlus);
app.mount("#app");