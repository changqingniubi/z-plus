/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 17:17:21
 * @LastEditTime: 2021-11-02 19:14:50
 * @LastEditors: changqing
 * @Usage: 
 */
// 打包方式：串行(series)  并行(parallel)
import { series, parallel } from "gulp";
import { genTypes } from "./gen-types";
import { run, withTaskName } from "./utils";
import { outDir, zpRoot } from "./utils/paths";

// gulp 不叫打包 做代码转化 vite
/**
 * 1. 打包样式
 * 2. 打包工具方法
 * 3. 打包所有组件
 * 4. 打包每个组件
 * 5. 生成一个组件库
 * 6. 发布组件
 */

const copySourceCode = () => async () => {
    await run(`cp ${zpRoot}/package.json ${outDir}/package.json`)
  }

//1.打包样式 2.打包工具方法 2.打包所有组件 3.打包每个组件 4.生成一个组件库 5.发布组件
export default series(
  withTaskName("clean", async () => run("rm -rf ./dist")),
  parallel(
    //会依次调用packages目录下对应包的build命令
    //我们要做的是把packages下的三个包components,theme-chalk,utils分别打包，最终生成到根目录下的dist目录，所以我们要在每个目录下的package.json下，增加build脚本，执行build脚本时，会在当前目录下找gulp配置文件gulpfile.ts

    withTaskName("buildPackages", () =>
      run("pnpm run --filter ./packages --parallel build")
    ),
    //打包完整组件库
    // 执行build命令时会调用rollup, 我们给rollup传递参数buildFullComponent 那么就会执行导出任务叫 buildFullComponent
    withTaskName("buildFullComponent", () =>
      run("pnpm run build buildFullComponent")
    ), 
    // 对组件依次打包
    withTaskName("buildComponent", () => run("pnpm run build buildComponent"))
  ),
  parallel(genTypes,copySourceCode())
);

//  这是一个任务
// 任务执行器  gulp 任务名 就会执行对应的任务

export * from "./full-component";
export * from "./component";
