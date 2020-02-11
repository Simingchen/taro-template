# taro-template Taro 框架开发模版

Taro 框架 (Taro + redux + scss + Taro-ui)，拿来即用的架子项目

## 配置好 config, request, store 等

1. 别名 (alias) '@' 的设置，h5 端口号的设置，引入 scss 全局变量等
 * tsconfig.json 下修改 paths 防止 vscode 编辑器报错
 * config/index.js 修改添加 h5 devServer 端口号
 * config/index.js 引入 sass 全局文件

2. utils 工具引入
 * jump 处理 webview 跳转
 * request 请求封装 

3. store 的封装
4. 入口文件 app.tsx 路由设置，windows 设置
5. 使用 scss 样式预编译


## 项目依赖安装

```
npm install
```

