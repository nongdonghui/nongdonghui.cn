---
layout: post
title: 教你用Cordova打包Vue项目
categories: cordova
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

第一步：安装cordova

```
npm install -g cordova
```

第二步：检验环境

```
cordova requirements
```

第二步：新建cordova项目

```
cordova create cordovaApp com.cordova.testapp
cd cordovaApp
cordova platform add android
```

第三步：修改vue项目

```
修改index.html在head之间加入

<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
<meta name="format-detection" content="telephone=no">
<meta name="msapplication-tap-highlight" content="no">
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">

```

Q1 使用Websocket异常：

```
Refused to connect to 'ws://192.168.20.186:8099/ld-mobile-server/weigh' because it violates the following Content Security Policy directive: "default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'". Note that 'connect-src' was not explicitly set, so 'default-src' is used as a fallback.
a @ js/9.3e79d269beb38d66984e.js:1
js/9.3e79d269beb38d66984e.js:1 Uncaught SecurityError: Failed to construct 'WebSocket': Refused to connect to 'ws://192.168.20.186:8099/ld-mobile-server/weigh' because it violates the document's Content Security Policy.

解决方案：
页面级别配置，允许页面的connect请求外域数据
设置Content-Security-Policy的connect-src *；


Refused to execute inline script because it violates the following Content Security Policy directive: "default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'".
 Either the 'unsafe-inline' keyword, a hash ('sha256-FHnVzrXhpOtWrkgyliiAXazqbkNKS+/DFGxknB42YNc='),
 or a nonce ('nonce-...') is required to enable inline execution.
 Note also that 'script-src' was not explicitly set, so 'default-src' is used as a fallback.

异常的原因：Content-Security-Policy的默认配置是default-src 'self'。

解决方案：添加script-src * 'unsafe-inline'，对于页面内部标签不进行安全验证。

使用npm run dev报异常：
Uncaught EvalError: Refused to evaluate a string as JavaScript 
because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self' 'unsafe-inline'".

解救方法：
修改webpack.dev.conf.js
设置devtool: 'cheap-module-source-map'
```

常用命令：

```

```


**更新列表：**



**参考文章：**

* [教你用Cordova打包Vue项目][1]
* [cordova实际使用总结][2]
* [Cordova Ajax请求跨域问题整理][3]
* [浏览器控制台报错][4]
* [cordova build安卓apk，关于版本号的修改（可能有误，看看就好，别当真）][5]
* [使用 Cordova 和 Vue.js 创建移动应用][6]
* [Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed][7]
* [融合Cordova和Vuejs的开发环境][8]
* [Cordova+Vue快速搭建Hybrid App][9]
* [Cordova app 检查更新 ----创建项目、添加插件、修改插件(一)][10]
* [Cordova app 检查更新 ----JS进行调用(二)][11]
* [使用 Hooks 自定义 build 过程][12]
* [Vue.js系列之vue-resource（6）][13]
* [使用cordova-app-loader热更新cordova项目][14]
* [][15]

[1]: https://www.jianshu.com/p/25d797b983cd
[2]: https://blog.csdn.net/dsb2008dsb/article/details/52159361
[3]: http://www.voidcn.com/article/p-vlaxwjrb-bhs.html
[4]: https://blog.csdn.net/xiaoxiong_jiaxin/article/details/83378314
[5]: https://blog.csdn.net/dlh918/article/details/76671275
[6]: https://blog.csdn.net/gaowenhui2008/article/details/53673092
[7]: https://stackoverflow.com/questions/48047150/refused-to-evaluate-a-string-as-javascript-because-unsafe-eval-is-not-an-allow
[8]: https://blog.domyself.me/2019/01/04/cordova-vuejs-integration.html
[9]: https://juejin.im/post/5b78e522f265da432144a3a6
[10]: https://www.cnblogs.com/ToFlying/p/5497871.html
[11]: http://www.cnblogs.com/ToFlying/p/5497992.html
[12]: https://www.ctolib.com/docs-cordova-3x-primer-foundation-c-use-hooks-to-define-build.html
[13]: https://blog.csdn.net/u013778905/article/details/54235906
[14]: https://my.oschina.net/u/871551/blog/751173
[15]: 