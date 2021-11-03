/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 17:19:53
 * @LastEditTime: 2021-11-01 17:19:54
 * @LastEditors: changqing
 * @Usage: 
 */
import { ZIcon } from "@z-plus/components";
import type { App } from "vue"; // ts中的优化只获取类型
// ....

const components = [ZIcon];
const install = (app: App) => {
  // 每个组件在编写的时候都提供了install方法

  // 有的是组建 有的可能是指令 xxx.install = ()=>{app.directive()}
  components.forEach((component) => app.use(component));
};
export default {
  install,
};
export * from "@z-plus/components";

//app.use(ZPlus)
