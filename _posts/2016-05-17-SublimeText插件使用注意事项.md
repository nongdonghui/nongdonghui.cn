---
layout: post
title: SublimeText插件使用注意事项
categories: SublimeText
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

缘起：要给网站添加一个返回顶部的功能，然后网上找了一个javascript代码，然后想直接在首页的html内测试，然后就把代码直接粘贴到首页了，是这样的

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">    
  </head>
  <body>
    
    <div class="container" id="top">
      ......
    </div>   
    
    <a href="#goTopBtn" title="返回顶部" class="gotop">
      &nbsp;&nbsp;↑
    </a>
    <script type="text/javascript">
    function goTopEx() { 
    var obj = document.getElementById("goTopBtn"); 
    function getScrollTop() { 
    return document.documentElement.scrollTop + document.body.scrollTop; 
    } 
    function setScrollTop(value) { 
    if (document.documentElement.scrollTop) { 
    document.documentElement.scrollTop = value; 
    } else { 
    document.body.scrollTop = value; 
    } 
    } 
    window.onscroll = function() { 
    getScrollTop() > 0 ? obj.style.display = "": obj.style.display = "none"; 
    } 
    obj.onclick = function() { 
    var goTop = setInterval(scrollMove, 10); 
    function scrollMove() { 
    setScrollTop(getScrollTop() / 1.1); 
    if (getScrollTop() < 1) clearInterval(goTop); 
    } 
    } 
    } 
    </script>
  </body>
</html>
```

这格式非常不可读，一秒都不想看下去了，想起了预装过的JsFormat插件，于是乎就想，把代码选中，然后用这个插件来把代码格式化，但是找遍了右键和工具栏的功能，就是没有格式化的选项，也在Preferences->Package Settings->JsFormat->Key Bindings - Default查看了一下，快捷键是`ctrl+alt+f`，试过也是不行，无奈只能上网找一下解决方案，最后在[这里][1]发现了别人使用JsFormat的方式是在.js文件里面使用的，然后我也看了[JsFormat github][2]的说明，第一句话就是

> **About**
> -------
> JsFormat is a javascript formatting plugin for Sublime Text 2. It uses [jsbeautifier][3] to format whole js or json files, or the selected portion(s).

顿时恍然，whole js or json files，所以在安装插件或者在使用插件的时候，还是要看官方的README.md文件，这可能会为自己节约很多时间。

**更新列表：**

* 2016-5-17



**参考文章：**

* [Sublime Text 3 全程详细图文原创教程（持续更新中。。。）][1]
* [JsFormat github][2]


[1]: http://www.cnblogs.com/wind128/p/4409422.html
[2]: https://github.com/jdc0589/jsformat
[3]: https://github.com/beautify-web/js-beautify
