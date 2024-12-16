# 第8课

## 开发
### 快速启动

```sh
# 使用 pnpm 来管理项目
pnpm i
```

### 开发模式

#### 基础组件开发模式

```sh
npm run dev:components
```

#### 业务组件开发模式

```sh
npm run dev:business
```

### 生产模式

```sh
npm run build
```

## 学习
### 目标
1. 将组件库封装成 npm 模块
2. 支持 ES Module 和 CommonJS 模块格式
3. 自动识别 TypeScript 类型
4. 组件按需加载
5. 支持主题定制

### 实现步骤

#### 1.建立项目目录
```tex
.
├── package.json            # 用来声明公共的操作脚本和公共的开发编译所需的 npm 模块
├── packages/               # 多子项目的目录。每个子项目都有各自的 package.json 项目声明文件
│   ├── business/           # 业务组件库 - 子项目目录
│   │   ├── package.json    # 业务组件库 - 子项目package.json声明
│   │   └── src/*           # 业务组件库 - 子项目源码目录
│   └── components/         # 基础组件库 - 子项目目录
│       ├── package.json    # 基础组件库 - 子项目package.json声明
│       └── src/*           # 基础组件库 - 子项目源码目录
├── pnpm-workspace.yaml     # pnpm 管理项目的配置文件
├── scripts/*               # 存放项目通用编译脚本
└── tsconfig.json           # 声明 TypeScript 的项目配置
```

#### 2.对根目录和子项目目录下的 package.json 依赖的初始化

#### 3.基于 pnpm 配置 monorepo 项目
在 pnpm-workspace.yaml 这个文件里，进行 monorepo 的项目配置。

#### 4.安装依赖
1. 全局安装 pnpm
2. 再在项目的根目录下执行 `pnpm i`

### 对组件库做编译设置
#### 1.设计子项目里组件库的文件目录格式
```tex
.
├── README.md
├── env.d.ts
├── package.json
├── packages
│   ├── business/
│   │   ├── package.json
│   │   └── src/                    # 业务组件库 - 子项目源码目录
│   │       ├── comp-000/           # 业务组件 - 单独组件目录
│   │       │   ├── xxxx.vue
│   │       │   ├── index.ts        # 业务组件 - 组件索引文件‼️
│   │       │   └── style
│   │       │       └── index.less  # 业务组件 - 组件样式文件‼️
│   │       ├── comp-001/*  
│   │       ├── comp-002/*  
│   │       ├── index.less
│   │       └── index.ts
│   └── components/
│       ├── package.json
│       └── src                     # 基础组件库 - 子项目源码目录
│           ├── comp-000/           # 基础组件 - 单独组件目录
│           │   ├── xxxx.vue
│           │   ├── index.ts        # 基础组件 - 组件索引文件‼️
│           │   └── style
│           │       └── index.less  # 基础组件 - 组件样式文件‼️
│           ├── comp-001/*  
│           ├── comp-002/*  
│           ├── index.less
│           └── index.ts
├── pnpm-workspace.yaml
├── scripts/*
└── tsconfig.json
```

不同类型的组件库里的每个单独组件都有一个**索引文件**和**样式文件**作为入口进行管理。这样就能保证我们的组件格式都是统一的，而且有一一对应的功能源码文件和样式文件，最后编译结果也能通过对应路径找到对应的组件。

#### 2.根据不同类型的对应组件目录，进行代码的编译

1. 第一步：编译 TypeScript 和 Vue.js 3.x 源码为 ES Module 和 CommonJS 模块的两种 JavaScript 代码文件；

   对应的文件是 script/build-moudle.ts

2. 第二步：编译出所有 JavaScript 文件的 TypeScript 类型描述文件；

3. 第三步：把文件编译 Less 成 CSS 文件。



### tips

- 使用 pnpm 可以自动更新 peerDependencies
  ```bash
  pnpm add vue --save-peer
  ```
- pnpm 内置了对单一存储库（也称为多包存储库、多项目存储库或单体存储库）的支持。
  > pnpm has built-in support for monorepositories (AKA multi-package repositories, multi-project repositories, or monolithic repositories). 