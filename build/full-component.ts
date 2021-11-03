/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 20:05:20
 * @LastEditTime: 2021-11-02 19:11:22
 * @LastEditors: changqing
 * @Usage: 
 */
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import { parallel } from "gulp";
import path from "path";
import { outDir, projectRoot, zpRoot } from "./utils/paths";
import { rollup ,OutputOptions} from "rollup";
import fs from 'fs/promises'
import { buildConfig } from "./utils/config";
import { pathRewriter } from "./utils";


// 打到dist根目录2个文件
const buildFull = async () => {
  // rollup打包的配置信息
  const config = {
    input: path.resolve(zpRoot, "index.ts"), // 打包的入口
    plugins: [nodeResolve(), typescript(), vue(), commonjs()],
    external: (id) => /^vue/.test(id), // 表示打包的时候不打包vue代码
  };
  // 整个组件库 两种使用方式 import 导入组件库 在浏览器中使用 script
  // esm umd
  const buildConfig = [
    {
      format: "umd", // 打包的个数
      file: path.resolve(outDir, "index.js"),
      name: "ZPlus", // 全局的名字
      exports: "named", // 导出的名字 用命名的方式导出  liraryTarget:"var" name:""
      globals: {
        // 表示使用的vue是全局的
        vue: "Vue",
      },
    },
    {
        format:'esm',
        file: path.resolve(outDir, "index.esm.js")
    }
  ];
  let bundle = await rollup(config);

  return Promise.all(buildConfig.map(config=>bundle.write(config as OutputOptions)))

  // bundle.write()
};


// 打包组件库入口z-plus
// 打到dist目录的es  lib 目录下
async function buildEntry() {
  const entryFiles = await fs.readdir(zpRoot, { withFileTypes: true });
  const entryPoints = entryFiles
    .filter((f) => f.isFile())
    .filter((f) => !["package.json"].includes(f.name))
    .map((f) => path.resolve(zpRoot, f.name));



  const config = {
    input: entryPoints,
    plugins: [nodeResolve(), vue(), typescript()],
    external: (id: string) => /^vue/.test(id) || /^@z-plus/.test(id),
  };
  const bundle = await rollup(config);
  return Promise.all(
    Object.values(buildConfig)
      .map((config) => ({
        format: config.format,
        dir: config.output.path,
        paths: pathRewriter(config.output.name),
      }))
      .map((option) => bundle.write(option as OutputOptions))
  );
}


export const buildFullComponent = parallel(buildFull, buildEntry);

// gulp适合流程控制 和 代码的转义 没有打包的功能
