---
layout: post
title: Oracle SQL Developer语言设置
categories: oracle
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


在软件ide/bin目录下找到sqldeveloper.conf或ide.conf,加入 
 
```
AddVMOption -Duser.language=en 
AddVMOption -Duser.country=US
``` 

然后启动就变成了英文界面


**参考文章：**

* [Oracle SQL Developer语言设置][1]

[1]: http://blog.csdn.net/ilovemilk/article/details/6268988