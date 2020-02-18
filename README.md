
# taro-template Taro 框架开发

Taro 框架 (Taro + redux + scss + Taro-ui)

## 配置好 config, request, store 等

1. 别名 (alias) '@' 的设置，h5 端口号的设置，引入 scss 全局变量等
  * tsconfig.json 下修改 paths 防止 vscode 编辑器报错
  * config/index.js 修改添加 h5 devServer 端口号
  * config/index.js 引入 sass 全局文件
  * copy 配置转移 wxparse 目录
 

2. utils 工具引入
  * jump 处理 webview 跳转
  * request 请求封装
  * 小程序wx

3. store 的封装
  * redux 使用
  
4. 入口文件 app.tsx 路由设置，windows 设置
  * 使用小程序分包机制
 
5. 使用 scss 样式预编译
  * 定义 mixins/variable.scss 全局变量等
  * 添加小程序/H5重置样式区分
  * 

# 业务介绍

目录结构


  ├── .temp                  // H5编译结果目录
  ├── .rn_temp               // RN编译结果目录
  ├── dist                   // 小程序编译结果目录
  ├── config                 // Taro配置目录
  │   ├── dev.js                 // 开发时配置
  │   ├── index.js               // 默认配置
  │   └── prod.js                // 打包时配置
  ├── site                   // H5静态文件（打包文件）
  ├── src                    // 源码目录
  │   ├── components             // 组件
  │   ├── actions                // actions
  │   ├── reducers               // reducers
  │   ├── constants              // constants 常量
  │   ├── store                  // store
  │   ├── static                 // 静态文件
  │   ├── models                 // redux models
  │   ├── pages                  // 页面文件目录
  │   │   └── home
  │   │       ├── index.js           // 页面逻辑
  │   │       ├── index.scss         // 页面样式
  │   │   └── subpages
  │   │       ├── pageA          // 页面
  │   │       └── pageB          // 页面B
  │   ├── styles             // 样式文件
  │   ├── utils              // 常用工具类
  │   ├── app.js             // 入口文件
  │   └── index.html
  ├── package.json
  └── tsconfig.jsson            // 配置
  
  
## 启动安装

项目依赖安装

```
npm install

```

运行 h5 
```
npm run dev:h5
```
运行 微信小程序
```
npm run dev:weapp
```
## 文档 document

[Taro](https://taro-docs.jd.com/taro/docs/tutorial.html)

[Taro-ui](https://taro-ui.jd.com/#/docs/quickstart)


[Taro 2.0.1 组件库文档](https://www.bookstack.cn/read/taro-2.0.1-components/96d11d925abbc107.md)

[Taro 2.0.1 使用文档](https://www.bookstack.cn/read/taro-2.0.1/about.md)

[Taro 2.0.1 API文档](https://www.bookstack.cn/read/taro-2.0.1-api/about.md)

