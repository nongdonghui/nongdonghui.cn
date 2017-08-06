---
layout: post
title: axure使用Master
categories: axure
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

问题：axure使用Master时，发现不能修改样式

说明：Master是可以重用的模板，将希望重用的控件放到一个Master里面，到需要使用的时候，拖动出来即可使用。

Master有3中类型，Place anywhere，Break away，Lock to Master Location

Place anywhere：可以放在页面中任何位置，但是样式不能修改

Break away：可以放在页面中任何位置，拖出来时，已和Master分离，可以任意修改样式

Lock to Master Location：锁定在Master的位置，不可修改

方法：因为我使用的是Place anywhere类型的，需要右键Master，Drop behavior，选择Break away类型即可，不过历史的样式不会自动修改，需要手动修改


**更新列表：**

*



**参考文章：**

* [Axure的15个使用技巧][1]

[1]: http://www.iaxure.com/53.html

