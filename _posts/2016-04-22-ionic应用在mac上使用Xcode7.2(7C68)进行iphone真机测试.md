---
layout: post
title: ionic应用在mac上使用Xcode7.2(7C68)进行iphone真机测试
---

{{ page.title }}
================

`{{ page.date | date: "%Y.%-m.%-d" }} - 南京`

##### 1.前提环境 : 假设已经在mac(OS X El Capitan 版本 10.11.2)上装好了Xcode7.2(7C68)和ionic环境
##### 2.运行添加ios平台命令 ionic platform add ios
##### 3.打开Xcode,导入项目
##### 4.添加Apple ID : Xcode - Preferences - Accounts - +
##### 5.添加成功后,在Apple IDs下单击选择刚才添加的Apple ID,可以看到右侧的Team Name后边的iOS和Mac都是free,，然后双击(或点击右下角的View Details...按钮)打开Team Name下的那条记录,在Signing Identities下点击iOS Development后边的create按钮,Xcode会自动在后台帮你生成Dev模式需要的certificate(Xcode7以前是没有这个自动生成的,需要手动工作),稍等片刻,完了之后点done
##### 6.在项目target的General页的Identity->Team中选中刚才Apple ID对应的项,然后我选择了Deployment->Main Interface选项
##### 7.运行,报异常

```sh
Terminating app due to uncaught exception 'NSUnknownKeyException', reason: '[<UIApplication 0x14e7b130> setValue:forUndefinedKey:]: this class is not key value coding-compliant for the key view.'
```

搜索

```sh
Terminating app due to uncaught exception 'NSUnknownKeyException', reason: '[<UIApplication 0x14e7b130> setValue:forUndefinedKey:]: this class is not key value coding-compliant for the key view.'
```

找到这个文章,看到了这句话`Error if Main Interface .xib is selected`,于是我就把Main Interface的选项清空,然后再运行,异常依旧,我再仔细看了这段内容,发现是这么说的: `Do not select a Main Interface - this should be left blank. Make sure you have selected all desired orientations and 'Requires full screen'`,然后我就找`Requires full screen`确保选中,再把`Main Interface`的下面一个项`Device Orientation`全部选上,然后再运行,成功了,app项目正常安装到iphone上运行了,Xcode后台是这样显示的

我琢磨着上面那段话的意思,应该是只用选`LandscapeLeft`和`LandscapeRight`两项就可以了,改了一下,运行看看,
发现在iphone5上是直接横屏的,选上`Upside Down`也是横屏,选上`Portrait`后就竖屏了.

##### PS1:刚开始的时候,是运行后,报这个异常: `could not find developer disk image` 错误然后我就把Xcode 9.3配置包放到 `/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport`路径下
##### PS2:我开始的时候登录了开发者账号,理论上Xcode7是不需要开发者账号就可以真机测试的

**参考文章：**

* [Publishing and Ionic Angular App for IOS - The Hidden Steps & Pitfalls][1]
* [Xcode 9.3配置包][2]
* [XCODE真机测试COULD NOT FIND DEVELOPER DISK IMAGE解决方法（支持IOS9.2）][3]
* [Xcode 7真机测试详解][4]
* [使用Xcode 7 beta免费真机调试iOS应用程序][5]
* [Xcode 7 无证书真机测试][6]


[1]: http://www.righthandedmonkey.com/2016/01/publishing-ionic-angular-app-for-ios.html
[2]: http://my.oschina.net/Nealyang/blog/650347
[3]: http://www.cnblogs.com/JackieHoo/p/5064757.html
[4]: http://www.cnblogs.com/iCocos/p/4756626.html
[5]: http://blog.k-res.net/archives/1862.html
[6]: http://www.lidaze.com/2015/10/01/Xcode7zhenjiceshi/