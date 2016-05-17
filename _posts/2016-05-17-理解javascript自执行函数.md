---
layout: post
title: 理解javascript自执行函数
categories: javascript
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

在上一篇文章我要做一个返回顶部的按钮，得到如下的代码

```html
<div id="backtotop" title="返回顶部" class="backtotop">
  &nbsp;&nbsp;↑
</div>
```

```javascript
function backtotopFn() {
  var obj = document.getElementById('backtotop');

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
    getScrollTop() > 0 ? obj.style.display = '' : obj.style.display = 'none';
  }
  obj.onclick = function() {
    var goTop = setInterval(scrollMove, 10);

    function scrollMove() {
      setScrollTop(getScrollTop() / 1.1);
      if (getScrollTop() < 1) clearInterval(goTop);
    }
  }
}
```

然后我需要在页面中调用它

```html
<script type="text/javascript" src="/js/js.js"></script>
<script type="text/javascript">backtotopFn();</script>
```

对，是需要写2个script标签，假如你这样写

```html
<script type="text/javascript" src="/js/js.js">backtotopFn();</script>
```

是不起作用的，除非你在`js.js`里面的末尾写`backtotopFn();`，这样也能消除在页面添加

```html
<script type="text/javascript">backtotopFn();</script>
```

这行代码，并且马上执行这个函数，但是有没有不用写调用方式它就自己执行呢，当然有了，就是javascript的自执行函数

```javascript
(function() {
  alert('a');
})()

或者

(function() {
  alert('a');
}())

不能这样写

function() {
  alert('a');
}()
```

现在来改造一下我们上面的javascript方法成自执行方法

```javascript
(function() {
  var obj = document.getElementById('backtotop');

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
    getScrollTop() > 0 ? obj.style.display = '' : obj.style.display = 'none';
  }
  obj.onclick = function() {
    var goTop = setInterval(scrollMove, 10);

    function scrollMove() {
      setScrollTop(getScrollTop() / 1.1);
      if (getScrollTop() < 1) clearInterval(goTop);
    }
  }
})();
```

如此，只要你的页面执行完后，脚本就已经生成了getScrollTop，setScrollTop这两个方法，并且给window添加了onscoll监听函数，当页面滚动的时候，判断是否显示backtotop按钮，还有给backtotop按钮添加了onclick监听函数，当单击它的时候，返回顶部。

使用google调试工具下的Profile可以监控执行过程，Start开始，Stop结束，然后就可以看到采集到的监控过程

![GoogleProfile](/images/GoogleProfile.png)

**更新列表：**

* 2016-5-13



**参考文章：**

* [一个简单的弹性返回顶部JS代码实现介绍][1]
* [javascript实用工具方法总结][2]
* [90 Creative Back To Top Links and Best Practices][3]
* [stuffandnonsense][4]


[1]: http://www.jb51.net/article/38228.htm
[2]: http://dreamoftch.iteye.com/blog/1958446
[3]: http://www.instantshift.com/2009/07/14/90-creative-back-to-top-links-and-best-practices/
[4]: https://stuffandnonsense.co.uk/
