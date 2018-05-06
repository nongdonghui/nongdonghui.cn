---
layout: post
title: jQuery实现动态创建div并分页打印
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


```javascript
var div = $('#printDiv');
div.empty();
for (var i=0; i<10; i++) {
    div.append('<div style="width:200px;height:200px;background:#636363;">' + i + '</div>');
    // 4项为一页
    if (i+1 % 4 ==0) {
	div.append('<div style="page-break-after: always"></div>');
    }
}

```

注意:
如果以<table>标签间隔，用<div style="page-break-after: always"></div>实现
如果以<tr>间隔，在要分页的地方用<tr style="page-break-after: always">实现


**更新列表：**

*



**参考文章：**

* [JQuery的append动态添加div][1]
* [Javascript动态创建div的方法][2]
* [如何在打印HTML页面时 控制分页][3]

[1]: https://blog.csdn.net/Thinkingcao/article/details/65444629
[2]: http://www.jb51.net/article/60919.htm
[3]: http://xmllong.blog.163.com/blog/static/29635669200911114951482/