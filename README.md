<!--
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 17:05:19
 * @LastEditTime: 2021-11-01 17:10:21
 * @LastEditors: changqing
 * @Usage: 
-->
- build 负责打包的文件夹  gulp 编译ts， 打包样式， 打包单文件组件
- dist 就是我们最终生成的打包结果
- packages 放着我们组件的代码  monorepo
- play用来测试代码 写的组件是否ok， 调试用的
- typings 放上我们的类型声明
- .npmrc 需要增加此文件安装依赖才会正常
- tsconfig ts的配置

## packages 
    > components存放所有组件的 最终通过index.ts 导出所有的组件
    > theme-chalk做样式的 BEM  （后续控制样式）
    > utils主要存放着多个模块之间的公共方法
   
## build打包模块 gulp来控制流程的


## dist目录打包出的整体结果
- es/lib两种规范
- theme-chalk
- 最终发布的模块就是dist模块 -》 element-plus -》 z-plus

## z-plus就是我们组件库的整合入口