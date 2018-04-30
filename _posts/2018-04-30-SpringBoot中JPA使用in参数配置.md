---
layout: post
title: SpringBoot中JPA使用in参数配置
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


```
@Modifying
@Query("update Secondment s set s.fstate=?3 where s.fid in(?1) and s.fstate=?2")
public void enable(List<String> ids, String stateFrom, String stateTo);

List中有2条记录时,打印的SQL语句如下:

update CM_Secondment set fstate=? where (fid in (? , ?)) and fstate=?

binding parameter [1] as [VARCHAR] - [已确认]
binding parameter [2] as [VARCHAR] - [8D3AE98FED77439BB9F45A0EFB86AFC5]
binding parameter [3] as [VARCHAR] - [BF30A7B0262F40B5A76138197FE78B73]
binding parameter [4] as [VARCHAR] - [未确认]
```

**更新列表：**

*



**参考文章：**

* [关于PreparedStatement以及Jpa中in参数的设置][1]
* [][2]


[1]: https://blog.csdn.net/u014529211/article/details/76032827
[2]: 
