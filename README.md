# Pocket Book

React + TypeScript + Express 账本。

## 项目概览

可访问[线上 Demo](http://47.95.241.143:9000/) 体验。

项目截图如下所示：

![image](https://cdn.nlark.com/yuque/0/2020/png/1413785/1600093435629-b30e7f7b-d0c1-4a98-80ad-48a799cc4803.png)

由图可见，项目根据月份展示了账单列表，列表的上方是一个工具栏，工具栏的右侧展示了当前列表的收支汇总。

在工具栏的左侧，可通过月份和分类来筛选需要展示的账单。

在工具栏的中间，点击“添加账单”按钮，可弹出添加账单的表单来添加账单，如下图所示：

![message.gif](https://cdn.nlark.com/yuque/0/2020/gif/1413785/1600518468879-c63ea23a-de23-4154-9e07-3fde216f15d0.gif)

## 本地运行

### 环境要求

本地需要安装 Node.js, 该项目开发时安装的版本为 12.18.3.

并需要全局安装 [yarn](https://yarnpkg.com/).

### 运行

```
$ yarn add-libs
$ yarn start
```

访问 http://locahost:3000 可查看本地项目。

### 测试

```
$yarn test
```

## 项目分析

### 基本需求

基本需求有以下四点：

1. 加载 CSV 数据（[账单数据](https://github.com/zhongyangxun/pocket-book/blob/master/server/data/bill.csv) 与 [账单分类数据](https://github.com/zhongyangxun/pocket-book/blob/master/server/data/categories.csv)）;
2. 以列表的形式展示账单内容，并且提供下拉框选择月份进行筛选，其中列表中所展示的账单为选择月份的账单；
3. 支持使用者添加账单；
4. 简单地统计并展示所选月份的收入和支出总金额。

此外，该项目还将实现对账单分类进行二次筛选。

### 需求分析

分析以上需求，可得出账本需要读取，展示并且修改（添加账单）CSV 文件的数据。如果只是简单的读取数据，单纯的前端代码就可实现。若涉及文件的写入，Node.js 是一个更好的方案。并且无论读写，以 Node.js 封装接口给前端调用都是一个更常规的做法。

所以，项目就以 Node.js 作为后端，直接操作 CSV 文件，并封装接口给前端代码，前端调用接口，来实现数据的查询与增加。

## 开发

### 技术选择

- 前端部分基于 [Create React App](https://create-react-app.dev/), CSS 框架用的是 Bootstrap，并使用 SCSS 在需要的时候编写自定义样式.。项目没有引入组件库，因为这个程序相对较小，不会涉及到很多组件，所以就选择自己编写项目的组件。
- 后端的 Node.js 代码基于 [Express](https://expressjs.com/)，利用 [csv-parse](https://github.com/adaltas/node-csv-parse) 来解析 CSV 文件，并使用 Node.js 的 `fs` 模块来进行 CSV 文件的写入。并利用 [joi](https://github.com/sideway/joi) 进行接口参数的校验，以 Express 的中间件 [cors](https://expressjs.com/en/resources/middleware/cors.html) 配置跨域资源共享。
- 前后端代码都是基于 TypeScript 编写，ESlint 的方案基于 `airbnb-typescript`  和 [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) 的推荐风格 ，以及少部分自定义规则。TypeScript 加上较为严格的 lint 方案，可提升代码可维护性，减少错误。
- 前端的测试代码基于 Create React App 内置的 `jest` 以及 `react-testing-library` .
- 项目采用的 Git 相关工具是 [husky](https://github.com/typicode/husky), 用其添加 hook, 在 commit 前运行测试以及 lint 检查。

### 项目结构

项目结构大致如下：

```
│  .eslintrc.json
│  .gitignore
│  package.json
│  README.md
│  tsconfig.json
│  yarn.lock
├─public
├─server
│  index.ts
│  │  package.json
│  │  tsconfig.json
│  │  yarn.lock
│  ├─data
│  └─routes
│
└─src
|   ├─api
|   ├─components
|   └─styles
```

其中 `server` 目录下放置的是后端代码， `src` 目录下是前端代码。

因为在本地开发的时候，需要同时运行前端和后端的代码，项目使用了 [concurrently](https://github.com/kimmobrunfeldt/concurrently) 来实现前后端服务的同时运行，只需在  `package.json` 的 `script` 字段中添加如下代码：

```
{
  "scripts": {
    "start": "concurrently \"yarn react-start\" \"cd server && yarn start\""
  }
}
```

在命令行中运行 `yarn start` 即可启动前后端的服务。

其中， `yarn-react-start` 启动前端的项目， `server` 目录下的 `yarn start` 启动后端项目。

## 功能分析

### 筛选账单

通过工具栏的月份选择器和分类选择器可以筛选账单。

选择月份或者分类时，将实时获取相应的账单列表。

其中，分类的选择器用的是 HTML 的 `select` 标签；月份选择器涉及年份和月份的选择，于是封装了一个选择月份的组件。

月份选择组件效果如下：

![filter.gif](https://cdn.nlark.com/yuque/0/2020/gif/1413785/1600528272229-7af9327d-c87c-4103-8f16-1bcec4785646.gif)

选择年份或月份时，将实时获取对应年月的数据；选择月份后将会关闭下拉框。并且点击下拉框以外部分，将会关闭下拉框。

关于“点击外部关闭下拉框”，是在 `document` 注册点击事件回调，若触发事件的 DOM 节点 `event.targe` 不属于月份选择器的外层节点，则关闭下拉框。

### 添加账单

用户点击“添加账单”按钮，会弹出添加账单的表单，表单会对数据进行校验，添加成功或失败后会弹出相应的信息。若添加成功，将会请求新账单所在月份的数据，来更新账单列表，使得新账单呈现在页面。如下所示：

![adding.gif](https://cdn.nlark.com/yuque/0/2020/gif/1413785/1600527642867-d2d5ed89-34bf-4e00-a088-12791e881c54.gif)

#### Modal

添加账单的表单是放在一个 Modal 弹出层的，项目中封装了一个 `Modal` 组件。

`Modal` 组件包含内容块和遮罩层组件 `Mask` 两个部分，`Mask` 要在页面内容之上，内容块要在 `Mask` 之上，可利用 CSS 属性 `position: fixed` 配合 `z-index`，使得 `Modal` 组件至于页面内容上方。

`Modal` 的弹出和关闭添加了动画， 使用的是 [react-transition-group](https://github.com/reactjs/react-transition-group) 中的 `CSSTransition`, 结合 CSS 的 `transition` 属性实现动画，并且用 SCSS 的 `mixin` 封装了动画样式。

#### Message

添加账单之后，无论是成功还是失败，都需要提示信息，所以又封装了一个提示信息的 API  `message`, 只需调用  `messge.info('提示信息')` 这样的方法就能弹出提示，调用效果如下所示：

![message.gif](https://cdn.nlark.com/yuque/0/2020/gif/1413785/1600591771230-3be3ff35-f3b1-494e-84d9-39f0c7a44a65.gif)





与 `message` API 有关的组件有两个，提示信息的组件 `Message` 以及 `Message` 的容器组件 `MessageContainer`.

只要有组件引入  `message`，就意味着会执行 `message` 入口文件的代码，可以在入口文件中，将容器组件 `MessageContainer` 挂载到页面的 `body` 上。

当 `message.info` 方法调用时，容器组件内添加一个包含提示信息以及唯一 `id` 的 `Message` 组件，使得提示信息显示在页面上。此时也将添加一个 3 秒的定时器，在 3 秒之后根据唯一 `id` 令提示信息消失。在 `Message` 容器中，管理提示信息队列的是 `useState` .

上面提到，会有多条提示信息，页面中提示信息的上限是 10 条。组件中用 `useEffect` 来监听响应信息的变化，当提示信息的数目大于 10 条时，将将从队列中移除第一条提示信息。

在 `message` 当中也使用了动画，动画的实现借助 `react-transition-group` 的 `TransitionGroup` 和 `CSSTransition`   . 之所以使用 `TransitionGroup`, 是因为页面中可能会同时有多条提示信息，而这些提示信息的组件 `Message` 各自都拥有弹出和消失的动画。

### 状态管理

由于项目的体量较小，所以项目内没有采用 `Redux` 或者 `MobX` 等状态管理工具，而是采用了 React 的 `Context` 结合 `useContext` 进行状态管理。

其中，共享的数据显然是与账单列表相关的数据，比如在列表组件和收支总览的组件都需要获得账单列表相关的数据，而在筛选组件与账单添加的组件，都需要获取账单数据并更新账单列表的能力。

## 部署

最初的设想是利用 [travis-ci](https://travis-ci.com/) 来实现自动部署。

可是在尝试当中发现，需要在项目 travis 的配置中配置私钥的解密，来实现 Github 仓库，服务器以及本地环境的互通，从而使得服务器可以抓取代码进行部署。由于本地环境是 Windows, 生成的私钥解密命令一直无法被 travis 解密，搜索调查后才得知 travis 的加密对 Windows 的支持并不好。

接下来的方案，是退一步，用 travis-ci 自动部署前端代码到 GitHub Pages，然后利用 PM2 在服务器上运行后端代码。 该方案的部署是成功的，可是，由于后台接口是基于 `HTTP` 的，而 GitHub Pages 的 URL 是基于  `HTTPS` 的，所以前端拿不到数据。 `HTTPS` 的接口需要申请 SSL 证书，申请 SSL 证书需要域名，而我没有域名，域名备案又需要将近二十天，所以这个方案也只能暂时放弃。

最后只能暂时将编译后的前端代码以及后端代码上传的服务器，托管给 PM2 来运行。
