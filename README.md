<p align="center">
  <img src="https://user-images.githubusercontent.com/10026019/44260701-d84b6e80-a247-11e8-9d79-5f82be615c84.png" width="300"/>
  <sub>quickstart</sub>
</p>


# Anka-quickstart

这份示例代码将帮助你上手 Anka-CLI。

详细文档参见[文档站点](https://iexception.github.io/anka-doc)。

## 基础使用

### 初始化项目

首先安装 Anka-CLI

```shell
$ npm install @anka-dev/cli -g
```

成功之后在终端执行 `anka`，应当能看见如下信息:

```shell
    _     _  _   _  _     _
   /_\   | \| | | |/ /   /_\
  / _ \  | .` | | ' <   / _ \
 /_/ \_\ |_|\_| |_|\_\ /_/ \_\

Usage:  <command> [options]

Options:
  --debug                             enable debug mode
  --quiet                             hide compile log
  -V, --version                       output the version number
  -h, --help                          output usage information

Commands:
  prod                                Production mode
  dev [pages...]                      Development mode
  init [options] <project-name>       Initialize new project
  new-page [options] <pages...>       Create a miniprogram page
  new-cmpt [options] <components...>  Create a miniprogram component
  enroll [options] <components...>    Enroll a miniprogram component
````

其次我们要做的是使用 CLI 创建一个项目目录。

```shell
$ anka init anka-quickstart
```

这个目录结构如下：

```shell
├── dist
├── anka.config.js
├── package.json
├── postcss.config.js
├── src
│   ├── app.json
│   ├── project.config.json
│   └── style
│       ├── _var.css
│       └── _var.scss
└── utils
    └── index.js
```

其中 `src` 是我们的源码代码目录，`dist` 是编译产出目录，预览时使用小程序开发 IDE 打开 `dist` 文件夹。

### 创建页面

进入 `anka-quickstart` 目录。并执行以下命令

```shell
$ anka page home
```

则会在 `src/` 目录发生如下变更：

```shell
├── src
│   ├── app.json
│   ├── pages
│   │   └── home
│   │       ├── home.js
│   │       ├── home.json
│   │       ├── home.wxml
│   │       └── home.wxss
```

并且 `src/app.json` 的 `pages` 字段多了一行：

```json
{
    "pages": [
        "pages/home/home"       // here
    ],
    "subPackages": [],
    "window": {
        "navigationBarTitleText": "Wechat"
    }
}
```

当然，我们也可以使用分包加载:

```shell
$ anka page home --root=packageA
```

与之前不一样的是 `src/app.json`:

```json
{
    "pages": [],
    "subPackages": [            // 这里变化
        {
            "root": "packageA",
            "pages": [
                "home/home"
            ]
        }
    ],
    "window": {
        "navigationBarTitleText": "Wechat"
    }
}
```

同时项目目录变化如下：

```shell
├── anka.config.js
├── package.json
├── postcss.config.js
├── src
│   ├── app.json
│   ├── packageA
│   │   └── home
│   │       ├── home.js
│   │       ├── home.json
│   │       ├── home.wxml
│   │       └── home.wxss
│   ├── project.config.json
│   └── style
│       ├── _var.css
│       └── _var.scss
└── utils
    └── index.js
```

### 创建组件

```shell
$ anka component co
```

则会在 `src/components` 下创建组件：

```shell
├── src
│   ├── app.json
│   ├── components
│   │   └── co
│   │       ├── co.js
│   │       ├── co.json
│   │       ├── co.wxml
│   │       └── co.wxss
```

但是组件不会被自动注册，所以还需要做一件事儿将 `co` 组件添加到 `home` 页:

```shell
$ anka add co --page=pages/home/home
```

查看 `src/pages/home/home.json` 我们会发现：

```js
{
    "navigationBarTitleText": "title",
    "navigationBarBackgroundColor": "#FFFFFF",
    "navigationBarTextStyle": "black",
    "usingComponents": {
        // 多了这一行
        "co": "/components/co/co"
    }
}
```

当然，我们也能移除组件，只要执行:

```shell
$ anka remove co --page=pages/home/home
```

## 提升开发效率

## dev 命令

执行下面这条命令，anka 会监听文件变化并自动处理 npm 依赖：

```shell
$ anka dev
```

比如我们可以在 `src/pages/home/home.js` 中这样写:

```javascript
import qs from 'qs'
import lodash from 'lodash'

Page({
  onLoad() {
    qs.stringify({
      name: 'anka'
    })
    console.log(lodash.cloneDeep(this.data))
  },

  onShow() {
    console.log(this, 'hello')
  }
})
```

前提是你已经安装 `qs` `lodash` 依赖。

### 使用 Sass 和 PostCSS

是的，我们能将 `src/paegs/home/home.wxss` 改写为 `src/paegs/home/home.css`，并且在里面引入别的 css 文件。需要区别的是，这里有两种引入方式：

- `@import "./_var.css";`
- `@wximport "./sub.css";`

`@import` 语句必须前置，其次是 `@wximport`。当使用 `@import` 时，文件会在编译时被引入，但是当使用 `@wximport` 时，文件并不会被合并，最终表现是：`@wximport` 转化为微信 `wxss` 的 `@import` 语法。

**注意: 不要忘记 `postcss.config.js` 文件**
