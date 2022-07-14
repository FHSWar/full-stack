# 全栈架子

## 环境

- mongodb5+
- redis7+
- nodejs16+

## 启动

1. ```shell
   nvm use 16
   ```

2. ```shell
   npm install
   ```

3. ```shell
   npm run dev
   ```

4. ⚠️注意：
   - 要在项目根目录执行。单独启动也可也，目前server还能通过`npm run prd`编译为js项目后用pm2运行

   - vscode 需要安装Volar、ESLint、Stylelint，使.vscode文件夹配置项生效

## 目录结构

- root（monorepo，typescript，husky，eslint）
  - client（axios+sass+vite+vue3全家桶+element-plus）
  - server（koa全家桶，mongoose，jwt，websocket，sse，路由自动注册，ts可编译为js项目运行）
  - server-worker（同server）
  - shared（repo们共用的工具代码）

## 特色

- 基于角色，完全配置化的前端路由
- 基于角色，完全配置化的接口鉴权
- 响应式的布局（侧边菜单自动折叠），可切换布局（经典布局和单列布局）
- 高原创性，目录结构设计服务于开发，代码十分精巧，充满思考。但没有故作高深，没有废代码，没有诡异的目录结构或令人费解的命名
