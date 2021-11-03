/*
 * @Description: 
 * @Author: changqing
 * @Date: 2021-11-01 19:04:44
 * @LastEditTime: 2021-11-02 19:48:33
 * @LastEditors: changqing
 * @Usage: 
 */


/**
 * 子进程
 * child_process.spawn(command[, args][, options])
 * command <string> 要运行的命令。
 * args <string[]> 字符串参数列表。
 * options <Object>
 *  - cwd <string> | <URL> 子进程的当前工作目录
 *  - stdio <Array> | <string> 子进程的标准输入输出配置。'inherit'：通过相应的标准输入输出流传入/传出父进程
 * - shell <boolean> | <string> 如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用    process.env.ComSpec。 可以将不同的 shell 指定为字符串。 请参阅 shell 的要求和默认的 Windows shell。 默认值: false （没有 shell）x
 */

import { spawn } from "child_process";
import { projectRoot } from "./paths";
// 自定义每个task的name
export const withTaskName = <T>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name });

// 在node使用子进程来运行脚本
export const run = async (command: string) => {
  // rf -rf
  // 将命令分割 例如：rm -rf 分割为['rm', '-rf'],进行解构[cmd,...args]
  return new Promise((resolve) => {
    const [cmd, ...args] = command.split(" ");

    // execa这些库 
    const app = spawn(cmd, args, {
      cwd: projectRoot,
      stdio: "inherit", // 直接将这个子进程的输出
      shell: true, // 默认情况下 linux 才支持 rm -rf （我再电脑里安装了git bash）
    });
    // 在进程已结束并且子进程的标准输入输出流已关闭之后，则触发 'close' 事件
    app.on("close", resolve);
  });
};

export const pathRewriter = (format)=>{
  return (id:string)=>{
    console.log('idtype',typeof id);
    console.log('id',id);
    id = id.replace(/@z-plus/g,`z-plus/${format}`);
    return id
  }
}