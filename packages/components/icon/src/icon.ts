/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 15:57:49
 * @LastEditTime: 2021-11-01 16:03:10
 * @LastEditors: changqing
 * @Usage: 
 */
import type { ExtractPropTypes } from "vue";
export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
}
export type IconProps = ExtractPropTypes<typeof iconProps>;