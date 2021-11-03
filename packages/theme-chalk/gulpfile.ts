/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 19:13:50
 * @LastEditTime: 2021-11-02 20:19:30
 * @LastEditors: changqing
 * @Usage: 
 */
// 打包样式
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import path from "path";
/**
 * gulp是类似一个管道的方式执行，从入口开始到出口，中间一步步执行
 */
import { series, src, dest } from "gulp";
/**
 * 对sass文件做处理
 */
function compile() {
  const sass = gulpSass(dartSass);
  // 从src下的scss文件开始=>编译成css=>添加前缀=>压缩=>最终输出到当前目录下dist下的css目录
  return src(path.resolve(__dirname, "./src/css/*.scss"))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(dest("./dist/css"));
}
/**
 * 处理font文件
 */
function copyfont() {
  // 从src下单fonts文件夹下的所有文件开始=>压缩=>最终输出到当前目录下dist下的font目录
  return src(path.resolve(__dirname, "./src/fonts/**"))
    .pipe(cleanCss())
    .pipe(dest("./dist/fonts"));
}
/**
 * 把打包好的css输出到根目录的dist
 */
function copyfullStyle() {
  return src(path.resolve(__dirname, "./dist/**")).pipe(
    dest(path.resolve(__dirname, "../../dist/theme-chalk"))
  );
}

export default series(compile, copyfont, copyfullStyle);