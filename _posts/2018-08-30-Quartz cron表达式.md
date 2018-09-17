---
layout: post
title: Quartz cron表达式
categories: quartz
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


```
1小时30分钟执行一次cron表达式: 0 30 0/2 * * ?

每天的0点、13点、18点、21点都执行一次：0 0 0,13,18,21 * * ?

<cron-expression>0 0/30 * * * ?</cron-expression>:每隔30分钟 
<cron-expression>0 0/15 * * * ?</cron-expression>每隔15分钟 
<cron-expression>0 0 0/1 * * ?</cron-expression>每隔1个小时 

```

**更新列表：**

* 8 14 20 4



**参考文章：**

* [cron 表达式 1小时30分钟执行一次][1]
* [][2]
* [][3]
* [][4]


[1]: https://blog.csdn.net/baidu_31301039/article/details/78982068
[2]: 
[3]: 
[4]: 