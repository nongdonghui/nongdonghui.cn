---
layout: post
title: SQLServer常用语句
categories: SQLServer
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
-- 给值加1位前缀0
update CM_Secondment set fPersonID='0'+fPersonID;
-- 给值去掉第1位
update CM_Secondment set fPersonID=SUBSTRING(fPersonID,2,LEN(fPersonID));


```



**更新列表：**

*



**参考文章：**

* [][1]
* [][2]
* [][3]
* [][4]

[1]: 
[2]: 
[3]: 
[4]: 

