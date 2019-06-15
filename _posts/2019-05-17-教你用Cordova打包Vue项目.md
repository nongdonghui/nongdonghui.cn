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

注意：不打包的时候（浏览器运行时）修改为<meta name="viewport" content="width=device-width,initial-scale=1.0">

```

第四步：引入cordova.js

```
在index.html引入cordova.js
<body>
    <div id="app"></div>
    <script type="text/javascript" src="cordova.js"></script>
</body>
```

第五步：修改src中的main.js

```
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

document.addEventListener('deviceready', function() {
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App }
    })
    window.navigator.splashscreen.hide()
}, false);
```

第六步：config文件夹中的index.js文件

```
修改build和dev中的

assetsSubDirectory: 'static',
assetsPublicPath: '/',

为

assetsSubDirectory: '',
assetsPublicPath: '',
```

第七步：运行

```
npm run dev
```

第八步：Cordova热更新插件使用

```
1.添加自动更新插件
cordova plugin add cordova-hot-code-push-plugin

2.添加cordova hot code push客户端
npm install -g cordova-hot-code-push-cli

3.修改config.xml
<chcp>
    <auto-download enabled="true" />
    <auto-install enabled="true" />
    <config-file url="http://192.168.20.186:8099/cordova/www/chcp.json" />
</chcp>

4.根目录下新建cordova-hcp.json，内容为
{ 
  "update": "start", 
  "content_url": "http://192.168.20.186:8099/cordova/www" 
}

其中update 何时触发进行安装（install）代码热更新
代码热更新涉及两个主要过程：fetch update 和 install update。前者获取热更新变更文件，后者将获取到的更新文件安装到 App 中生效。
此字段是针对后者，何时 install update，可选值：

start：应用启动，默认项（install update when application is launched）
resume：应用从后台恢复（install the update when application is resumed from background state）
now：下载更新后立即执行（install update as soon as it has been downloaded）

5.执行cordova-hcp build,生成hash文件

6.然后将www文件夹拷贝覆盖http://192.168.20.186:8099/cordova/www文件夹

然后app打开时会自动下载更新内容
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

Q2：怎么在运行时引入cordova.js和document.addEventListener('deviceready')

```
在main.js进行运行时引入，即手机端时引入cordova.js，然后监听硬件设备事件，否则不需要引入：

if (window.location.protocol === 'file:') {
    const cordovaScript = document.createElement('script');
	cordovaScript.setAttribute('type', 'text/javascript');
	cordovaScript.setAttribute('src', 'cordova.js');
	document.body.appendChild(cordovaScript);

    document.addEventListener('deviceready', function() {
		cordova.getAppVersion.getVersionNumber().then(function (version) {
			var versionCode = version; // parseInt(version.toString().replace(/\./g,''));
			navigator.notification.alert(
					'当前版本：' + versionCode,		// 对话的消息
					alertCallback,					// 回调函数
					'提示',							// 标题
					'确认'							// 按钮文字
			);
			console.log(versionCode);
		});
		new Vue({
			router,
			store,
			render: h => h(home)
		}).$mount('#app');
		window.navigator.splashscreen.hide();
	}, false);
} else {
    const app = new Vue({
		router,
		store,
		render: h => h(home)
	}).$mount('#app');
}
```

Q3
"WebSocket connection to 'ws://localhost/Test/socket' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED"
服务器没开

WebSocket connection to 'wss://192.168.20.186:8099/ld-mobile-server/weigh' failed: Error in connection establishment: net::ERR_CERT_AUTHORITY_INVALID
证书没有配置

Bad Request
This combination of host and port requires TLS.
没有使用https访问

解决WSS报错：WebSocket connection failed: Error in connection establishment: net::ERR_CERT_AUTHORITY_INVALID

```
1. 打开 Chrome，新开一个Tab页面。

2. 访问自己的测试域名：https://www.wss.com。

3. 你会发现浏览器告警："您的连接不是私密连接......."。

4. 不要慌，往下面看，点"高级"。

5. 继续点击 "继续前往 www.wss.com（不安全）"。

6. 页面会提示"400 Bad Request......"，不用管，这是因为用HTTP协议访问WSS服务所致，不用管，到这里就可以解决提示错误啦。
```

Q4.vue文件的乱码问题

编辑器的文件编码设置为utf-8



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
* [Cordova热更新插件使用][15]
* [cordova-hot-code-push][16]
* [Cordova 代码热更新][17]
* [解决WSS报错：WebSocket connection failed: Error in connection establishment: net::ERR_CERT_AUTHORITY_INVALID][18]
* [vue文件的乱码问题][19]
* [][20]

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
[15]: https://www.jianshu.com/p/21962c2f322f
[16]: https://github.com/nordnet/cordova-hot-code-push
[17]: https://objcer.com/2017/06/18/cordova-hot-code-push/
[18]: http://www.blogdaren.com/post-2456.html
[19]: https://www.imooc.com/wenda/detail/355085
[20]: 