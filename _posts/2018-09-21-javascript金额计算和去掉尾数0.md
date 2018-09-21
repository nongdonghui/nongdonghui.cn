---
layout: post
title: javascript金额计算和去掉尾数0
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>



```
parseFloat("0.80"); ->输出0.8

parseFloat("0.800"); ->输出0.8

parseFloat("100.080"); ->输出100.08
```

**更新列表：**

*



**参考文章：**

* [js中进行金额计算parseFloat][1]
* [JavaScript 数字去掉小数点后的0][2]

[1]: http://www.cnblogs.com/anlove0328-1121/p/5509357.html
[2]: https://blog.csdn.net/shizhiailian/article/details/73278292