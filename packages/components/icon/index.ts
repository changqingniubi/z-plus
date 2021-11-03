/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 15:58:34
 * @LastEditTime: 2021-11-02 19:34:09
 * @LastEditors: changqing
 * @Usage: 
 */
import { withInstall } from "@z-plus/utils/with-install";
import Icon from "./src/icon.vue";
const ZIcon = withInstall(Icon);

export {
    ZIcon
}
export default ZIcon;// 导出组件
//export * from "./src/icon"; // 导出组件的属性类型